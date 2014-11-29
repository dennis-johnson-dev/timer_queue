var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');

var TaskActions = {

  createProject: function(project) {
    var AppAPI = require('../api/AppAPI');
    // AppDispatcher.handleViewAction({
    //   actionType: TaskConstants.ActionTypes.CREATE_PROJECT,
    //   project: project
    // });

    AppAPI.postProject(project);
  },

  receiveProject: function(project) {
    AppDispatcher.handleViewAction({
      actionType: TaskConstants.ActionTypes.CREATE_PROJECT,
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

module.exports = TaskActions;
