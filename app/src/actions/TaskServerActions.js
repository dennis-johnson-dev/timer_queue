var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');

module.exports = {

  createProject: function(project) {
    AppDispatcher.handleServerAction({
      actionType: TaskConstants.ActionTypes.CREATE_PROJECT,
      project: project
    });
  },

  deleteProject: function(id) {
    AppDispatcher.handleServerAction({
      actionType: TaskConstants.ActionTypes.DELETE_PROJECT,
      id: id
    });
  },

  updateProject: function(project) {
    AppDispatcher.handleServerAction({
      actionType: TaskConstants.ActionTypes.UPDATE_PROJECT,
      project: project
    });
  },

  receiveProjects: function(projects) {
    AppDispatcher.handleServerAction({
      actionType: TaskConstants.ActionTypes.RECEIVE_PROJECTS,
      projects: projects
    });
  }

};
