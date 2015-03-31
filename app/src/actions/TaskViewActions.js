var TaskConstants = require('../constants/TaskConstants');
var AppAPI = require('../api/AppAPI');
var Marty = require('marty');
var _ = require('lodash');

class TaskViewActions extends Marty.ActionCreators {
  id: 'TaskViewActionCreators'
  displayName: 'TaskViewActionCreators'

  createProject(project) {
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
  }

  deleteProject(id) {
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
  }

  updateProject(project) {
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
  }

  retry() {
    AppAPI.flush();
    this.dispatch(TaskConstants.RETRY_REQUESTS);
  }
}

module.exports = Marty.register(TaskViewActions);