var TaskConstants = require('../constants/TaskConstants');
var _ = require('lodash');
var Marty = require('marty');
var Immutable = require('immutable');

var CHANGE_EVENT = 'change';

var _projects = [];

function createProject(project) {
  _projects.push(project);
  TaskStore.hasChanged();
}

var actionQueue = [];
// array of functions to call 

var TaskStore = Marty.createStore({
  displayName: 'tasks',
  handlers: {
    setProjects: TaskConstants.RECEIVE_PROJECTS,
    createProject: TaskConstants.CREATE_PROJECT,
    deleteProject: TaskConstants.DELETE_PROJECT,
    updateProject: TaskConstants.UPDATE_PROJECT,
    opt_createProject: TaskConstants.OPT_CREATE_PROJECT,
    opt_deleteProject: TaskConstants.OPT_DELETE_PROJECT,
    opt_updateProject: TaskConstants.OPT_UPDATE_PROJECT
  },
  getInitialState: function() {
    return {
      projects: Immutable.List()
    };
  },
  setProjects: function(projects) {
    this.state.projects = Immutable.List(projects);
    _projects = projects;
    this.hasChanged();
  },
  createProject: function(project, actionId) {
    this.state.projects = this.state.projects.push(project);
    _.remove(actionQueue, { id: actionId });
    this.hasChanged();
  },
  deleteProject: function(id) {
    _.remove(_projects, { '_id': id });
    // remove opt action from queue
    this.hasChanged();
  },
  updateProject: function(project) {
    var elementIndex = _.findIndex(_projects, function(proj) {
      return proj._id === project._id;
    });

    _projects[elementIndex] = project;
    // remove opt action from queue
    this.hasChanged();
  },
  getProject: function(id) {
    this.applyUpdates();
    return _.cloneDeep(_.find(_projects, { '_id': id }));
  },
  getProjects: function() {
    this.applyUpdates();
    return _projects;
  },
  applyUpdates: function() {
    _projects = this.state.projects.toJS();
    console.log('action queue', actionQueue);
    actionQueue.forEach(function(element) {
      element.cb(element.payload);
    });
  },
  opt_createProject: function(action) {
    actionQueue.push({
      id: action.uid, 
      cb: createProject,
      payload: action.payload
    });
    this.hasChanged();
  },
  opt_deleteProject: () => {
  },
  opt_updateProject: () => {

  },
  queueAdd: () => {

  },
  queueDelete: () => {

  },
  queueUpdate: () => {

  }
});

module.exports = TaskStore;