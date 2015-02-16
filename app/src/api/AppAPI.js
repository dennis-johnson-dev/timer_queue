var TaskServerActions = require('../actions/TaskServerActions');
var AppActions = require('../actions/AppActions');
var request = require('superagent');

module.exports = {
  init: function() {
    return new Promise((resolve, reject) => {
      request
        .get('/api/projects')
        .end(function(err, res) {
          if (err) {
            TaskServerActions.error(actionId);
            reject(err);
          } else {
            TaskServerActions.receiveProjects(res.body);
            resolve();
          }
        });
    });
  },

  createProject: (project, actionId) => {
    console.log('about to post');
    request
      .post('/api/projects')
      .send(project)
      .end(function(err, res) {
        console.log(res);
        if (err) {
          // figure out how to handle error handling
          TaskServerActions.error(actionId);
        } else {
          console.log('stuck on server part');
          TaskServerActions.createProject(project, actionId);
        }
      });
  },

  deleteProject: (id, actionId) => {
    request
      .del('/api/projects/' + id)
      .end(function(err, res) {
        if (err) {
          TaskServerActions.error(actionId);
        } else {
          TaskServerActions.deleteProject(id, actionId);
        }
      });
  },

  updateProject: (project, actionId) => {
    request
      .put('/api/projects/' + project._id)
      .send(project)
      .end(function(err, res) {
        if (err) {
          TaskServerActions.error(actionId);
        } else {
          TaskServerActions.updateProject(project, actionId);
        }
      });
  }
};
