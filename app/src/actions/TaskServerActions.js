var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');
var Marty = require('marty');

var TaskServerActions = Marty.createActionCreators({

  createProject: TaskConstants.CREATE_PROJECT(function(project) {
    this.dispatch(project);
  }),

  deleteProject: TaskConstants.DELETE_PROJECT(function(id) {
    this.dispatch(id);
  }),

  updateProject: TaskConstants.UPDATE_PROJECT(function(project) {
    this.dispatch(project);
  }),

  receiveProjects: TaskConstants.RECEIVE_PROJECTS(function(projects) {
    this.dispatch(projects);
  })

});

module.exports = TaskServerActions;