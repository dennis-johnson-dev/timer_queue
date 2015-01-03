var TaskServerActions = require('../actions/TaskServerActions');
var request = require('superagent');

module.exports = {
  init: function() {
    return new Promise((resolve, reject) => {
      request
        .get('/api/projects')
        .end(function(err, res) {
          if (err) {
            reject(err);
          } else {
            TaskServerActions.receiveProjects(res.body);
            resolve();
          }
        });
    });
  },

  createProject: (project) => {
    request
      .post('/api/projects')
      .send(project)
      .end(function(err, res) {
        console.log(err);
      });
  },

  deleteProject: (id) => {
    request
      .del('/api/projects/' + id)
      .end(function(err, res) {
        if (err) {
          console.log(err);
        } else {
          TaskServerActions.deleteProject(id);
        }
      });
  },

  updateProject: (project) => {
    request
      .put('/api/projects/' + project._id)
      .send(project)
      .end(function(err, res) {
        if (err) {
          console.log(err);
        }
      });
  }
};
