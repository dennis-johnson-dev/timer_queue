var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');
var AppAPI = require('../api/AppAPI');

module.exports = {

  createProject: function(project) {
    AppDispatcher.handleViewAction({
      actionType: TaskConstants.ActionTypes.CREATE_PROJECT,
      project: project
    });

    AppAPI.createProject(project);
  },

  deleteProject: function(id) {
    AppDispatcher.handleViewAction({
      actionType: TaskConstants.ActionTypes.DELETE_PROJECT,
      id: id
    });
    
    AppAPI.deleteProject(id);
  },

  updateProject: function(project) {
    AppDispatcher.handleViewAction({
      actionType: TaskConstants.ActionTypes.UPDATE_PROJECT,
      project: project
    });
    
    AppAPI.updateProject(project);
  }
};
