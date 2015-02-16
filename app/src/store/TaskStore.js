var AppConstants = require('../constants/AppConstants');
var TaskConstants = require('../constants/TaskConstants');
var _ = require('lodash');
var Marty = require('marty');
var Immutable = require('immutable');

var CHANGE_EVENT = 'change';

// Todo: Make REAL queue...
var actionQueue = [];

var TaskStore = Marty.createStore({
  displayName: 'tasks',
  handlers: {
    setProjects: TaskConstants.RECEIVE_PROJECTS,
    viewCreateProject: TaskConstants.VIEW_CREATE_PROJECT,
    viewDeleteProject: TaskConstants.VIEW_DELETE_PROJECT,
    viewUpdateProject: TaskConstants.VIEW_UPDATE_PROJECT,
    createProject: TaskConstants.CREATE_PROJECT,
    deleteProject: TaskConstants.DELETE_PROJECT,
    updateProject: TaskConstants.UPDATE_PROJECT,
    error: AppConstants.ERROR
  },
  getInitialState: function() {
    return {
      projects: Immutable.List(),
      projectChange: Immutable.List()
    };
  },
  setProjects: function(projects) {
    this.state.projects = Immutable.List(projects);
    this.applyUpdates();
    this.hasChanged();
  },
  viewCreateProject: function(project, actionId) {
    actionQueue.push({
      id: actionId, 
      cb: this._createProjectChange.bind(this),
      payload: project
    });
    console.log('action queue in viewCreate ', actionQueue);

    this._createProjectChange(project);
    this.hasChanged();
  },
  viewDeleteProject: function(id, actionId) {
    actionQueue.push({
      id: actionId, 
      cb: this._deleteProjectChange.bind(this),
      payload: id
    });

    this._deleteProjectChange(id);
    this.hasChanged();
  },
  viewUpdateProject: function(project, actionId) {
    actionQueue.push({
      id: actionId, 
      cb: this._updateProjectChange.bind(this),
      payload: project
    });

    this._updateProjectChange(project);
    this.hasChanged();
  },
  createProject: function(project, actionId) {
    this.state.projects = this.state.projects.push(project);
    _.remove(actionQueue, { id: actionId });
    console.log('creating project from server');
    this.applyUpdates();
    this.hasChanged();
  },
  deleteProject: function(id, actionId) {
    let index = this.state.projects.findIndex((project) => { 
      return project.id === id;
    });

    this.state.projects = this.state.projects.delete(index);

    _.remove(actionQueue, { id: actionId });
    this.applyUpdates();
    this.hasChanged();
  },
  updateProject: function(project, actionId) {
    let index = this.state.projects.findIndex((projectChange) => {
      return projectChange._id === project.id;
    });

    this.state.projects = this.state.projects.set(index, project);

    _.remove(actionQueue, { id: actionId });
    this.applyUpdates();
    this.hasChanged();
  },
  getProject: function(id) {
    var index = this.state.projectChange.findIndex(function(project) {
      return project.id === id;
    });
    return this.state.projectChange.get(index);
  },
  getProjects: function() {
    return this.state.projectChange.toJS();
  },
  applyUpdates: function() {
    console.log('applying updates');
    if (!Immutable.is(this.state.projectChange, this.state.projects)) {
      console.log(this.state.projectChange, this.state.projects);
      this.state.projectChange = this.state.projects;
      console.log('action queue: ', actionQueue);
      actionQueue.forEach((action) => {
        action.cb(action.payload);
      });
      console.log('state updated');
    } else {
      console.log('no update needed');
    }
  },
  error: function(actionId) {
    _.remove(actionQueue, { id: actionId });
    this.applyUpdates();
    this.hasChanged();
  },
  _createProjectChange: function(project) {
    console.log('creating project on the view');
    this.state.projectChange = this.state.projectChange.push(project);
  },
  _deleteProjectChange: function(id) {
    let index = this.state.projectChange.findIndex((projectChange) => {
      return projectChange.id === id;
    });
    this.state.projectChange = this.state.projectChange.delete(index);
  },
  _updateProjectChange: function(project) {
    let index = this.state.projectChange.findIndex((projectChange) => {
      return projectChange.id === project.id;
    });
    this.state.projectChange = this.state.projectChange.set(index, project);
  }
});

module.exports = TaskStore;