const TaskConstants = require('../constants/TaskConstants');
const AppAPI = require('../api/AppAPI');
const Marty = require('marty');
const _ = require('lodash');

class TaskViewActions extends Marty.ActionCreators {
  constructor(options) {
    super(options);
  }

  createProject(project) {
    const apiOptions = {
      url: '/api/projects',
      method: 'POST',
      body: project
    };

    const action = this.dispatch(TaskConstants.CREATE_PROJECT_OPTIMISTIC, project);

    this.app.AppAPI.requester(apiOptions, action).then((res) => {
      this.dispatch(TaskConstants.CLEANUP_RECORD, project.id, res.action);
    }, (err) => {
      this.dispatch(TaskConstants.REVERT_UPDATE, project.id, res.action);
    });
  }

  deleteProject(id) {
    const apiOptions = {
      url: '/api/projects/' + id,
      method: 'DELETE',
      body: ""
    };

    const action = this.dispatch(TaskConstants.DELETE_PROJECT_OPTIMISTIC, id);

    this.app.AppAPI.request(apiOptions).then(() => {
      this.dispatch(TaskConstants.CLEANUP_RECORD, null, action);
    }, (err) => {
      this.dispatch(TaskConstants.REVERT_UPDATE, null, action);
    });
  }

  updateProject(project) {
    const apiOptions = {
      url: '/api/projects/' + project.id,
      method: 'PUT',
      body: project
    };

    this.app.AppAPI.request(apiOptions).then(() => {
      this.dispatch(TaskConstants.UPDATE_PROJECT_OPTIMISTIC, project);
    });
  }
}

module.exports = TaskViewActions;
