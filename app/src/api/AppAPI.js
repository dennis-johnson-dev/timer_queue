var TaskServerActions = require('../actions/TaskServerActions');
var AppActions = require('../actions/AppActions');
var request = require('superagent');

module.exports = {
  init: function() {
    return new Promise((resolve, reject) => {
      request
        .get('/api/projects')
        .end(function(err, res) {
          if (err || res.status !== 200) {
            AppActions.error('Unable to get project', actionId);
            reject(err);
          } else {
            TaskServerActions.receiveProjects(res.body);
            resolve();
          }
        });
    });
  },

  createProject: (project, actionId) => {
    request
      .post('/api/projects')
      .send(project)
      .end(function(err, res) {
        if (err || res.status !== 200) {
          AppActions.error('Unable to creat project', actionId);
        } else {
          TaskServerActions.createProject(project, actionId);
        }
      });
  },

  deleteProject: (id, actionId) => {
    request
      .del('/api/projects/' + id)
      .end(function(err, res) {
        if (err || res.status !== 200) {
          AppActions.error('Unable to delete project', actionId);
        } else {
          TaskServerActions.deleteProject(id, actionId);
        }
      });
  },

  updateProject: (project, actionId) => {
    request
      .put('/api/projects/' + project.id)
      .send(project)
      .end(function(err, res) {
        if (err || res.status !== 200) {
          AppActions.error('Unable to update project', actionId);
        } else {
          TaskServerActions.updateProject(project, actionId);
        }
      });
  }
};
