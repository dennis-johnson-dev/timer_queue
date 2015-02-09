var TaskConstants = require('../constants/TaskConstants');
var _ = require('lodash');
var Marty = require('marty');
var Immutable = require('immutable');

var CHANGE_EVENT = 'change';

var _projects = [];

// Todo: Make REAL queue...
var actionQueue = [];

function createProject(project) {
  _projects.push(project);
}

function updateProject(project) {
  var elementIndex = _.findIndex(_projects, function(proj) {
    return proj.id === project.id;
  });

  _projects[elementIndex] = project;
}

function deleteProject(id) {
  _.remove(_projects, { 'id': id });
}

var TaskStore = Marty.createStore({
  displayName: 'tasks',
  handlers: {
    setProjects: TaskConstants.RECEIVE_PROJECTS,
    createProject: TaskConstants.CREATE_PROJECT,
    deleteProject: TaskConstants.DELETE_PROJECT,
    updateProject: TaskConstants.UPDATE_PROJECT,
    opt_createProject: TaskConstants.OPT_CREATE_PROJECT,
    opt_deleteProject: TaskConstants.OPT_DELETE_PROJECT,
    opt_updateProject: TaskConstants.OPT_UPDATE_PROJECT,
    error: TaskConstants.ERROR
  },
  getInitialState: function() {
    return {
      projects: Immutable.List(),
      projectChangeState: Immutable.List()
    };
  },
  setProjects: function(projects) {
    this.state.projects = Immutable.List(projects);
    this.hasChanged();
  },
  createProject: function(project, actionId) {
    this.state.projects = this.state.projects.push(project);
    _.remove(actionQueue, { id: actionId });
    this.hasChanged();
  },
  deleteProject: function(id, actionId) {
    let index = this.state.projects.findIndex((project) => { 
      return project.id === id;
    });
    this.state.projects = this.state.projects.delete(index);
    _.remove(actionQueue, { id: actionId });
    this.hasChanged();
  },
  updateProject: function(project, actionId) {
    let elementIndex = _.findIndex(_projects, function(proj) {
      return proj._id === project._id;
    });

    this.state.projects = this.state.projects.set(elementIndex, project);

    _.remove(actionQueue, { id: actionId });
    this.hasChanged();
  },
  opt_createProject: function(action) {
    actionQueue.push({
      id: action.uid, 
      cb: createProject,
      payload: action.payload
    });
    this.hasChanged();
  },
  opt_deleteProject: function(action) {
    actionQueue.push({
      id: action.uid, 
      cb: deleteProject,
      payload: action.payload
    });
    this.hasChanged();
  },
  opt_updateProject: function(action) {
    actionQueue.push({
      id: action.uid, 
      cb: updateProject,
      payload: action.payload
    });
    this.hasChanged();
  },
  getProject: function(id) {
    this.applyUpdates();
    return _.cloneDeep(_.find(_projects, { 'id': id }));
  },
  getProjects: function() {
    this.applyUpdates();
    return _projects;
  },
  applyUpdates: function() {
    _projects = this.state.projects.toJS();
    console.log('action queue', actionQueue);
    actionQueue.forEach(function(action) {
      action.cb(action.payload);
    });
  },
  error: function(id) {
    _.remove(actionQueue, { id: actionId });
  }
});

module.exports = TaskStore;