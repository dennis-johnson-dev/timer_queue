var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');
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
  })

});

module.exports = TaskServerActions;