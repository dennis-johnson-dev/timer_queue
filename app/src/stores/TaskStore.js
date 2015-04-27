var AppConstants = require('../constants/AppConstants');
var TaskConstants = require('../constants/TaskConstants');
var _ = require('lodash');
var Marty = require('marty');
var Immutable = require('immutable');
var OptimisticStore = require('./OptimisticStore');
var TaskQueries = require('../queries/TaskQueries');

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
      setProject: TaskConstants.RECEIVE_PROJECT,
      createProject: TaskConstants.CREATE_PROJECT,
      deleteProject: TaskConstants.DELETE_PROJECT,
      updateProject: TaskConstants.UPDATE_PROJECT,
      error: AppConstants.RESOLVE
    };
    this.hasUpdated = false;
  }
  setProject(newProject) {
    const index = _.findIndex(this.state.projectChange, (project) => {
      return project.id === newProject.id;
    });

    if (index === -1) {
      this.state.projects.push(newProject);
    } else {
      this.state.projects[index] = newProject;
    }

    this.applyUpdates(true);
    this.hasChanged();
  }
  setProjects(projects) {
    console.log('setting')
    this.state.projects = projects;
    this.hasUpdated = true;
    this.applyUpdates(true);
    this.hasChanged();
  }
  getProject(id) {
    return this.fetch({
      id: 'project-' + id,
      locally: function() {
        const index = _.findIndex(this.state.projectChange, function(project) {
          return project.id === id;
        });

        if (index > -1) {
          return _.cloneDeep(this.state.projectChange[index]);
        }
      },
      remotely: function() {
        return TaskQueries.for(this).getProject(id);
      },
      dependsOn: this.getUpdates()
    });
  }
  getProjects() {
    return this.fetch({
      id: 'projects',
      locally: function() {
        console.log('locally')
        if (this.hasUpdated) {
          console.log('has data')
          return this.state.projectChange;
        }
        console.log('doesn\'t have data')
      },
      remotely: function() {
        console.log('remotely')
        return TaskQueries.for(this).getProjects();
      },
      dependsOn: this.getUpdates()
    });
  }
  getUpdates() {
    return this.fetch({
      id: 'updates',
      locally: function() {
        this.state.updates = OptimisticStore.for(this).getUpdates().result;
        this.applyUpdates();
        return Promise.resolve();
      }
    });
  }
  applyUpdates(force) {
    const forceVal = force || false;
    const hasUpdates = this.state.updates.length > 0;
    const hasChanged = !_.isEqual(this.state.projectChange, this.state.projects);
    const hasProjects = this.state.projectChange && this.state.projectChange.length > 0;
    if (forceVal || hasUpdates || (hasChanged && hasProjects)) {
      this.state.projectChange = _.cloneDeep(this.state.projects);

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
          this.state.projectChange.splice(index, 1);
          return;
        }

        if (index > -1) {
          this.state.projectChange[index] = update;
        } else {
          if (!_.isString(update)) {
            this.state.projectChange.push(update);
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
    this.state.projects.push(project);
    this.applyUpdates();
    this.hasChanged();
  }
  deleteProject(id) {
    const index = _.findIndex(this.state.projects, (project) => {
      return project.id === id;
    });

    if (index > -1) {
      this.state.projects.splice(index, 1);
    }

    this.applyUpdates();
    this.hasChanged();
  }
  updateProject(project) {
    const index = _.findIndex(this.state.projects, (projectChange) => {
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
