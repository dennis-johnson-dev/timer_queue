var AppConstants = require('../constants/AppConstants');
var TaskConstants = require('../constants/TaskConstants');
var _ = require('lodash');
var Marty = require('marty');
var Immutable = require('immutable');
var OptimisticStore = require('./OptimisticStore');

var CHANGE_EVENT = 'change';

// Todo: Make REAL queue...
var actionQueue = [];

var TaskStore = Marty.createStore({
  displayName: 'Task Store',
  handlers: {
    setProjects: TaskConstants.RECEIVE_PROJECTS,
    viewCreateProject: TaskConstants.VIEW_CREATE_PROJECT,
    viewDeleteProject: TaskConstants.VIEW_DELETE_PROJECT,
    viewUpdateProject: TaskConstants.VIEW_UPDATE_PROJECT,
    createProject: TaskConstants.CREATE_PROJECT,
    deleteProject: TaskConstants.DELETE_PROJECT,
    updateProject: TaskConstants.UPDATE_PROJECT,
    error: AppConstants.RESOLVE
  },
  getInitialState: function() {
    return {
      projects: new Immutable.List(),
      projectChange: new Immutable.List()
    };
  },
  setProjects: function(projects) {
    this.state.projects = new Immutable.List(projects);
    this.applyUpdates();
    this.hasChanged();
  },
  viewCreateProject: function(project, actionId) {
    actionQueue.push({
      id: actionId, 
      cb: this._createProjectChange.bind(this),
      payload: project
    });

    this._createProjectChange(project, this.state.projectChange);
  },
  viewDeleteProject: function(id, actionId) {
    actionQueue.push({
      id: actionId, 
      cb: this._deleteProjectChange.bind(this),
      payload: id
    });

    this._deleteProjectChange(id);
  },
  viewUpdateProject: function(project, actionId) {
    actionQueue.push({
      id: actionId, 
      cb: this._updateProjectChange.bind(this),
      payload: project
    });

    this._updateProjectChange(project);
  },
  createProject: function(project, actionId) {
    this.state.projects = this.state.projects.push(project);
    _.remove(actionQueue, { id: actionId });
    this.applyUpdates();
    this.hasChanged();
  },
  deleteProject: function(id, actionId) {
    let index = this.state.projects.findIndex((project) => { 
      return project.id === id;
    });

    if (index > -1) {
      this.state.projects = this.state.projects.delete(index);
    }

    _.remove(actionQueue, { id: actionId });
    this.applyUpdates();
    this.hasChanged();
  },
  updateProject: function(project, actionId) {
    let index = this.state.projects.findIndex((projectChange) => {
      return projectChange.id === project.id;
    });

    if (index > -1 ) {
      this.state.projects = this.state.projects.set(index, project);
    }

    _.remove(actionQueue, { id: actionId });
    this.applyUpdates();
    this.hasChanged();
  },
  getProject: function(id) {
    return this.fetch({
      id: id,
      locally: function() {
        var optimisticProject = OptimisticStore.getProject(id);
        if (_.isNull(optimisticProject)) {
          var index = this.state.projects.findIndex(function(project) {
            return project.id === id;
          });

          return _.cloneDeep(this.state.projects.get(index));
        } else {
          console.log('optimistic record');
          return optimisticProject;
        }
      }
    });
  },
  getProjects: function() {
    return this.state.projectChange.toJS();
  },
  applyUpdates: function(force) {
    console.log('applying updates');
    if (force || !Immutable.is(this.state.projectChange, this.state.projects)) {
      this.state.projectChange = this.state.projects;
      actionQueue.forEach((action) => {
        action.cb(action.payload);
      });
      console.log('state updated');
    } else {
      console.log('no update needed');
    }
  },
  error: function(action) {
    _.remove(actionQueue, { id: action.actionId });
    this.applyUpdates(true);
    this.hasChanged();
  },
  _createProjectChange: function(project, source) {
    this.state.projectChange = this.state.projectChange.push(project);
  },
  _deleteProjectChange: function(id) {
    let index = this.state.projectChange.findIndex((projectChange) => {
      return projectChange.id === id;
    });

    if (index > -1) {
      this.state.projectChange = this.state.projectChange.delete(index);
    }
  },
  _updateProjectChange: function(project) {
    let index = this.state.projectChange.findIndex((projectChange) => {
      return projectChange.id === project.id;
    });
  
    if (index > -1) {
      this.state.projectChange = this.state.projectChange.set(index, project);
    }
  }
});

module.exports = TaskStore;