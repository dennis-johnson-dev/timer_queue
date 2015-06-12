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

    const action = this.dispatch(TaskConstants.CREATE_PROJECT, project);

    this.app.AppAPI.request(apiOptions).then(() => {
      this.dispatch(TaskConstants.CLEANUP_RECORD, project.id, action.id);
    }, (err) => {
      this.dispatch(TaskConstants.REVERT_UPDATE, project.id, action.id);
    });
  }

  deleteProject(id) {
    const apiOptions = {
      url: '/api/projects/' + id,
      method: 'DELETE',
      body: ""
    };

    this.app.AppAPI.request(apiOptions).then(() => {
      this.dispatch(TaskConstants.DELETE_PROJECT, id);
    });
  }

  updateProject(project) {
    const apiOptions = {
      url: '/api/projects/' + project.id,
      method: 'PUT',
      body: project
    };

    this.app.AppAPI.request(apiOptions).then(() => {
      this.dispatch(TaskConstants.UPDATE_PROJECT, project);
    });
  }
}

module.exports = TaskViewActions;
