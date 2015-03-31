var TaskConstants = require('../constants/TaskConstants');
var AppConstants = require('../constants/AppConstants');
var Marty = require('marty');

class TaskServerActions extends Marty.ActionCreators {
  id: 'TaskServerActionCreators'
  displayName: 'TaskServerActionCreators'

  createProject(project, uid) {
    this.dispatch(TaskConstants.CREATE_PROJECT, project, uid);
  }

  deleteProject(id, uid) {
    this.dispatch(TaskConstants.DELETE_PROJECT, id, uid);
  }

  updateProject(project, uid) {
    this.dispatch(TaskConstants.UPDATE_PROJECT, project, uid);
  }

  receiveProjects(projects) {
    this.dispatch(TaskConstants.RECEIVE_PROJECTS, projects);
  }

  error(msg, actionId) {
    this.dispatch(AppConstants.ERROR, actionId);
  }

  flushRequests() {
    this.dispatch(TaskConstants.FLUSH_REQUESTS);
  }

  removeErrors(results) {
    this.dispatch(TaskConstants.REMOVE_ERRORS, results);
  }

}

module.exports = Marty.register(TaskServerActions);