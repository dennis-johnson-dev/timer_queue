var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');
var AppAPI = require('../api/AppAPI');

var TaskActions = {

  create: function(task) {
    AppDispatcher.handleViewAction({
      actionType: TaskConstants.ActionTypes.TASK_CREATE,
      task: task
    });
  },

  decrement: function() {
    AppDispatcher.handleViewAction({
      actionType: TaskConstants.ActionTypes.DECREMENT
    })
  },

  receiveProjects: function(projects) {
    AppDispatcher.handleServerAction({
      actionType: TaskConstants.ActionTypes.RECEIVE_PROJECTS,
      projects: projects
    });
  },

  reset: function() {
    AppDispatcher.handleViewAction({
      actionType: TaskConstants.ActionTypes.RESET_PROJECT
    });
    // AppAPI.init().then(function(projects) {
    //   TaskActions.receiveProjects(projects);
    // });
  }

};

module.exports = TaskActions;
