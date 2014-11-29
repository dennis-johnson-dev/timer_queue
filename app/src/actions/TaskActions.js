var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');

var TaskActions = {

  createProject: function(project) {
    var AppAPI = require('../api/AppAPI');
    AppDispatcher.handleViewAction({
      actionType: TaskConstants.ActionTypes.CREATE_PROJECT,
      project: project
    });

    AppAPI.createProject(project);
  },

  receiveProject: function(result) {
    AppDispatcher.handleViewAction({
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

module.exports = TaskActions;
