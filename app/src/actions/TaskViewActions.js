var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');
var AppAPI = require('../api/AppAPI');
var Marty = require('marty');

var TaskViewActions = Marty.createActionCreators({

  createProject: TaskConstants.CREATE_PROJECT(function(project) {
    this.dispatch(project);

    AppAPI.createProject(project);
  }),

  deleteProject: TaskConstants.DELETE_PROJECT(function(id) {
    this.dispatch(id);
    
    AppAPI.deleteProject(id);
  }),

  updateProject: TaskConstants.UPDATE_PROJECT(function(project) {
    this.dispatch(project);
    
    AppAPI.updateProject(project);
  })
});

module.exports = TaskViewActions;
