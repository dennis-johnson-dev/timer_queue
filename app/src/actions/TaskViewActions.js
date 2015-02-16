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
    this.dispatch(action.payload, action.uid);

    console.log('about to create in API');
    AppAPI.createProject(project, action.uid);
  }),

  deleteProject: TaskConstants.VIEW_DELETE_PROJECT(function(id) {
    var action = {
      payload: id,
      uid: _.uniqueId()
    };
    this.dispatch(action.payload, action.uid);
    
    AppAPI.deleteProject(id, action.uid);
  }),

  updateProject: TaskConstants.VIEW_UPDATE_PROJECT(function(project) {
    var action = {
      payload: project,
      uid: _.uniqueId()
    };
    this.dispatch(action.payload, action.uid);
    
    AppAPI.updateProject(project, action.uid);
  })
});

module.exports = TaskViewActions;