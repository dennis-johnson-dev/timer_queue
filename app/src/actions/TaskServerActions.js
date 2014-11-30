var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');

module.exports = {

  deleteProject: function(id) {
    AppDispatcher.handleServerAction({
      actionType: TaskConstants.ActionTypes.DELET_PROJECT,
      id: id
    });
  },

  receiveProject: function(result) {
    AppDispatcher.handleServerAction({
      actionType: TaskConstants.ActionTypes.PROJECT_CREATE_RESULT,
      result: result
    });
  },

  receiveProjects: function(projects) {
    AppDispatcher.handleServerAction({
      actionType: TaskConstants.ActionTypes.RECEIVE_PROJECTS,
      projects: projects
    });
  }

};
