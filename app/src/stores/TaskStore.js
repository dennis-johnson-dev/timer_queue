var AppConstants = require('../constants/AppConstants');
var TaskConstants = require('../constants/TaskConstants');
var _ = require('lodash');
var Marty = require('marty');
var Immutable = require('immutable');
var OptimisticStore = require('./OptimisticStore');

var CHANGE_EVENT = 'change';

var TaskStore = Marty.createStore({
  displayName: 'Task Store',
  handlers: {
    setProjects: TaskConstants.RECEIVE_PROJECTS,
    createProject: TaskConstants.CREATE_PROJECT,
    deleteProject: TaskConstants.DELETE_PROJECT,
    updateProject: TaskConstants.UPDATE_PROJECT,
    error: AppConstants.RESOLVE
  },
  getInitialState: function() {
    return {
      projects: new Immutable.List(),
      projectChange: new Immutable.List(),
      updates: []
    };
  },
  setProjects: function(projects) {
    this.state.projects = new Immutable.List(projects);
    this.applyUpdates();
    this.hasChanged();
  },
  getProject: function(id) {
    return this.fetch({
      id: 'project-' + id,
      locally: function() {
        const index = this.state.projectChange.findIndex(function(project) {
          return project.id === id;
        });

        return _.cloneDeep(this.state.projectChange.get(index));
      },
      dependsOn: this.getUpdates()
    });
  },
  getProjects: function() {
    return this.fetch({
      id: 'projects' + _.uniqueId(),
      locally: function() {
        return this.state.projectChange.toJS();
      },
      dependsOn: this.getUpdates()
    });
  },
  getUpdates: function() {
    return this.fetch({
      id: 'updates-' + _.uniqueId(),
      locally: function() {
        this.state.updates = OptimisticStore.getUpdates();
        this.applyUpdates();
        return true;
      }
    });
  },
  applyUpdates: function(force=false) {
    var hasUpdates = this.state.updates.length > 0;
    if (force || hasUpdates || !Immutable.is(this.state.projectChange, this.state.projects)) {
      this.state.projectChange = this.state.projects;
      
      if (this.state.updates.length === 0) {
        return;
      }

      this.state.updates.forEach((update) => {
        const index = this.state.projectChange.findIndex((project) => {
          return project.id === update.id;
        });

        if (_.isString(update)) {
          this.state.projectChange = this.state.projectChange.delete(index);
          return;
        }

        if (index > -1) {
          this.state.projectChange = this.state.projectChange.set(index, update);
        } else {
          this.state.projectChange = this.state.projectChange.push(update);
        }
      }, this);
    }
  },
  error: function(action) {
    this.applyUpdates(true);
    this.hasChanged();
  },
  createProject: function(project, actionId) {
    this.state.projects = this.state.projects.push(project);
    this.applyUpdates();
    this.hasChanged();
  },
  deleteProject: function(id, actionId) {
    const index = this.state.projects.findIndex((project) => { 
      return project.id === id;
    });

    if (index > -1) {
      this.state.projects = this.state.projects.delete(index);
    }

    this.applyUpdates();
    this.hasChanged();
  },
  updateProject: function(project, actionId) {
    const index = this.state.projects.findIndex((projectChange) => {
      return projectChange.id === project.id;
    });

    if (index > -1 ) {
      this.state.projects = this.state.projects.set(index, project);
    }

    this.applyUpdates();
    this.hasChanged();
  }
});

module.exports = TaskStore;