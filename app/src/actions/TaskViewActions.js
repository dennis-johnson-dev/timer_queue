var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');
var AppAPI = require('../api/AppAPI');
var Marty = require('marty');
var _ = require('lodash');

var TaskViewActions = Marty.createActionCreators({

  createProject: TaskConstants.OPT_CREATE_PROJECT(function(project) {
    var action = {
      payload: project,
      uid: _.uniqueId()
    }
    this.dispatch(action);

    AppAPI.createProject(project, action.uid);
  }),

  deleteProject: TaskConstants.OPT_DELETE_PROJECT(function(id) {
    this.dispatch(id);
    
    AppAPI.deleteProject(id);
  }),

  updateProject: TaskConstants.OPT_UPDATE_PROJECT(function(project) {
    this.dispatch(project);
    
    AppAPI.updateProject(project);
  })
});

module.exports = TaskViewActions;