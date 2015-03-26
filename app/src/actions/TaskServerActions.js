var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');
var AppConstants = require('../constants/AppConstants');
var Marty = require('marty');

var TaskServerActions = Marty.createActionCreators({
  id: 'TaskServerActionCreators',

  createProject: function(project, uid) {
    this.dispatch(TaskConstants.CREATE_PROJECT, project, uid);
  },

  deleteProject: function(id, uid) {
    this.dispatch(TaskConstants.DELETE_PROJECT, id, uid);
  },

  updateProject: function(project, uid) {
    this.dispatch(TaskConstants.UPDATE_PROJECT, project, uid);
  },

  receiveProjects: function(projects) {
    this.dispatch(TaskConstants.RECEIVE_PROJECTS, projects);
  },

  error: function(msg, actionId) {
    this.dispatch(AppConstants.ERROR, actionId);
  },

  flushRequests: function() {
    this.dispatch(TaskConstants.FLUSH_REQUESTS);
  },

  removeErrors: function(results) {
    this.dispatch(TaskConstants.REMOVE_ERRORS, results);
  }

});

module.exports = TaskServerActions;