var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');

var TaskActions = {

  create: function(task) {
    AppDispatcher.handleViewAction({
      actionType: TaskConstants.ActionTypes.TASK_CREATE,
      task: task
    });
  },

  receiveProjects: function(projects) {
    AppDispatcher.handleServerAction({
      actionType: TaskConstants.ActionTypes.RECEIVE_PROJECTS,
      projects: projects
    })
  }

};

module.exports = TaskActions;
