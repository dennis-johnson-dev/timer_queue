var AppConstants = require('../constants/AppConstants');
var TaskConstants = require('../constants/TaskConstants');
var _ = require('lodash');
var Marty = require('marty');
var Immutable = require('immutable');
var OptimisticStore = require('./OptimisticStore');
var TaskQueries = require('../queries/TaskQueries');

var CHANGE_EVENT = 'change';

class TaskStore extends Marty.Store {
  constructor(options) {
    super(options);
    this.id = 'TaskStore';
    this.state = {
      projects: [],
      projectChange: [],
      updates: []
    };
    this.handlers = {
      setProjects: TaskConstants.RECEIVE_PROJECTS,
      createProject: TaskConstants.CREATE_PROJECT,
      deleteProject: TaskConstants.DELETE_PROJECT,
      updateProject: TaskConstants.UPDATE_PROJECT,
      error: AppConstants.RESOLVE
    };
    this.hasLoaded = false;
  }
  setProjects(projects) {
    this.state.projects = projects;
    this.hasLoaded = true;
    this.applyUpdates(true);
    this.hasChanged();
  }
  getProject(id) {
    return this.fetch({
      id: 'project-' + id,
      locally: function() {
        const index = _.find(this.state.projectChange, function(project) {
          return project.id === id;
        });

        return _.cloneDeep(this.state.projectChange[index]);
      },
      dependsOn: this.getUpdates()
    });
  }
  getProjects() {
    return this.fetch({
      id: 'projects' + _.uniqueId(),
      locally: function() {
        if (!this.hasLoaded) {
          return;
        } else {
          return this.state.projectChange;
        }
      },
      remotely: function() {
        return TaskQueries.for(this).getProjects();
      },
      dependsOn: this.getUpdates()
    });
  }
  getUpdates() {
    return this.fetch({
      id: 'updates-' + _.uniqueId(),
      locally: function() {
        this.state.updates = OptimisticStore.for(this).getUpdates().result;
        this.applyUpdates();
        return true;
      }
    });
  }
  applyUpdates(force) {
    const forceVal = force || false;
    var hasUpdates = this.state.updates.length > 0;
    if (forceVal || hasUpdates || this.state.projectChange !== this.state.projects) {
      this.state.projectChange = this.state.projects;
      
      if (this.state.updates.length === 0) {
        return;
      }

      this.state.updates.forEach((update) => {
        const index = _.findIndex(this.state.projectChange, (project) => {
          if (update.id) {
            return project.id === update.id;
          } else {
            return project.id === update;
          }
        });

        if (_.isString(update)) {
          this.state.projectChange = this.state.projectChange.splice(index, 0);
          return;
        }

        if (index > -1) {
          this.state.projectChange = this.state.projectChange.set(index, update);
        } else {
          if (!_.isString(update)) {
            this.state.projectChange = this.state.projectChange.push(update);
          }
        }
      }, this);
    }
  }
  error(action) {
    this.applyUpdates(true);
    this.hasChanged();
  }
  createProject(project) {
    this.state.projects = this.state.projects.push(project);
    this.applyUpdates();
    this.hasChanged();
  }
  deleteProject(id) {
    const index = _.find(this.state.projects, (project) => { 
      return project.id === id;
    });

    if (index > -1) {
      this.state.projects = this.state.projects.splice(index, 1);
    }

    this.applyUpdates();
    this.hasChanged();
  }
  updateProject(project) {
    const index = _.find(this.state.projects, (projectChange) => {
      return projectChange.id === project.id;
    });

    if (index > -1 ) {
      this.state.projects[index] =  project;
    }

    this.applyUpdates();
    this.hasChanged();
  }
}

module.exports = Marty.register(TaskStore);