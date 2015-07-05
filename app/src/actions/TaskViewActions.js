const AppConstants = require('../constants/AppConstants');
const TaskConstants = require('../constants/TaskConstants');
const AppAPI = require('../api/AppAPI');
const Marty = require('marty');
const _ = require('lodash');

class TaskViewActions extends Marty.ActionCreators {
  constructor(options) {
    super(options);
  }

  createProject(project) {
    const action = this.dispatch(TaskConstants.CREATE_PROJECT, project, { optimistic: true });
    const apiOptions = {
      action,
      body: project,
      id: action.id,
      method: 'POST',
      url: '/api/projects'
    };

    this.app.AppAPI.requester(apiOptions).then((res) => {
      this.dispatch(TaskConstants.CLEANUP_RECORD, { id: project.id }, res.action);
    }, (err) => {
      this.dispatch(AppConstants.ERROR, { id: err.id, msg: 'Failed connecting with the server...' });
    }).catch((err) => {
      throw new err;
    });
  }

  deleteProject(id) {
    const action = this.dispatch(TaskConstants.DELETE_PROJECT, { id }, { optimistic: true });
    const apiOptions = {
      action,
      id: action.id,
      body: "",
      method: 'DELETE',
      url: '/api/projects/' + id
    };

    this.app.AppAPI.requester(apiOptions, action).then(() => {
      this.dispatch(TaskConstants.CLEANUP_RECORD, action);
    }, (err) => {
      this.dispatch(AppConstants.ERROR, { id: err.id, msg: 'Failed connecting with the server...' });
    }).catch((err) => {
      throw new err;
    });
  }

  updateProject(project) {
    const action = this.dispatch(TaskConstants.UPDATE_PROJECT, project, { optimistic: true });
    const apiOptions = {
      action,
      id: action.id,
      body: project,
      method: 'PUT',
      url: '/api/projects/' + project.id
    };

    this.app.AppAPI.requester(apiOptions, action).then((res) => {
      this.dispatch(TaskConstants.CLEANUP_RECORD, { id: project.id }, res.action);
    }, (err) => {
      this.dispatch(AppConstants.ERROR, { id: err.id, msg: 'Failed connecting with the server...' });
    }).catch((err) => {
      throw new err;
    });
  }

  setError(error) {
    error.id = _.uniqueId();
    this.dispatch(AppConstants.ERROR, error);
  }

  resolveError(id) {
    this.dispatch(AppConstants.RESOLVE_ERROR, { id });
  }

  revertUpdate(action) {
    this.app.AppAPI.removeRequest(action);
    this.dispatch(TaskConstants.REVERT_UPDATE, action)
  }

  retryRequests() {
    this.app.AppAPI.flushRequests().then((results) => {
      this.dispatch(AppConstants.RESOLVE_ERRORS, results);
    }, (err) => {
    });
  }
}

module.exports = TaskViewActions;
