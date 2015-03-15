var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');
var AppAPI = require('../api/AppAPI');
var Marty = require('marty');
var _ = require('lodash');

var TaskViewActions = Marty.createActionCreators({

  createProject: TaskConstants.VIEW_CREATE_PROJECT(function(project) {
    var action = {
      payload: project,
      uid: _.uniqueId()
    };

    var apiOptions = {
      url: '/api/projects',
      method: 'POST',
      body: project
    };

    this.dispatch(action.payload, action.uid, apiOptions);

    AppAPI.createProject(project, action.uid, apiOptions);
  }),

  deleteProject: TaskConstants.VIEW_DELETE_PROJECT(function(id) {
    var action = {
      payload: id,
      uid: _.uniqueId()
    };

    var apiOptions = {
      url: '/api/projects/' + id,
      method: 'DELETE',
      body: ""
    };

    this.dispatch(action.payload, action.uid, apiOptions);
    
    AppAPI.deleteProject(id, action.uid, apiOptions);
  }),

  updateProject: TaskConstants.VIEW_UPDATE_PROJECT(function(project) {
    var action = {
      payload: project,
      uid: _.uniqueId()
    };

    var apiOptions = {
      url: '/api/projects/' + project.id,
      method: 'PUT',
      body: project
    };

    this.dispatch(action.payload, action.uid, apiOptions);
    
    AppAPI.updateProject(project, action.uid, apiOptions);
  }),

  retry: TaskConstants.RETRY_REQUESTS(function() {
    AppAPI.flush();
  })
});

module.exports = TaskViewActions;