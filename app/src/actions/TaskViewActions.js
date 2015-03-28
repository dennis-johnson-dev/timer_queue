var TaskConstants = require('../constants/TaskConstants');
var AppAPI = require('../api/AppAPI');
var Marty = require('marty');
var _ = require('lodash');

var TaskViewActions = Marty.createActionCreators({
  id: 'TaskViewActionCreators',

  createProject: function(project) {
    var action = {
      payload: project,
      uid: _.uniqueId()
    };

    var apiOptions = {
      url: '/api/projects',
      method: 'POST',
      body: project
    };

    this.dispatch(TaskConstants.VIEW_CREATE_PROJECT, action.payload, action.uid, apiOptions);

    AppAPI.createProject(project, action.uid, apiOptions);
  },

  deleteProject: function(id) {
    var action = {
      payload: id,
      uid: _.uniqueId()
    };

    var apiOptions = {
      url: '/api/projects/' + id,
      method: 'DELETE',
      body: ""
    };

    this.dispatch(TaskConstants.VIEW_DELETE_PROJECT, action.payload, action.uid, apiOptions);
    
    AppAPI.deleteProject(id, action.uid, apiOptions);
  },

  updateProject: function(project) {
    var action = {
      payload: project,
      uid: _.uniqueId()
    };

    var apiOptions = {
      url: '/api/projects/' + project.id,
      method: 'PUT',
      body: project
    };

    this.dispatch(TaskConstants.VIEW_UPDATE_PROJECT, action.payload, action.uid, apiOptions);
    
    AppAPI.updateProject(project, action.uid, apiOptions);
  },

  retry: function() {
    AppAPI.flush();
    this.dispatch(TaskConstants.RETRY_REQUESTS);
  }
});

module.exports = TaskViewActions;