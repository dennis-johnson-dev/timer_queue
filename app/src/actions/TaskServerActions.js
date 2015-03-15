var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');
var AppConstants = require('../constants/AppConstants');
var Marty = require('marty');

var TaskServerActions = Marty.createActionCreators({

  createProject: TaskConstants.CREATE_PROJECT(function(project, uid) {
    this.dispatch(project, uid);
  }),

  deleteProject: TaskConstants.DELETE_PROJECT(function(id, uid) {
    this.dispatch(id, uid);
  }),

  updateProject: TaskConstants.UPDATE_PROJECT(function(project, uid) {
    this.dispatch(project, uid);
  }),

  receiveProjects: TaskConstants.RECEIVE_PROJECTS(function(projects) {
    this.dispatch(projects);
  }),

  error: AppConstants.ERROR(function(msg, actionId) {
    this.dispatch(actionId);
  }),

  flushRequests: TaskConstants.FLUSH_REQUESTS(function() {
    this.dispatch();
  }),

  removeErrors: TaskConstants.REMOVE_ERRORS(function(results) {
    this.dispatch(results);
  })

});

module.exports = TaskServerActions;