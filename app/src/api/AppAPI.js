var Q = require('q');
var TaskServerActions = require('../actions/TaskServerActions');
var request = require('superagent');

module.exports = {
  init: function() {
    var promise = new Q.Promise(function(resolve, reject) {
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

    return promise;
  },

  createProject: function(project) {
    request
      .post('/api/projects')
      .send(project)
      .end(function(err, res) {
        console.log(err);
      });
  },

  deleteProject: function(id) {
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

  updateProject: function(project) {
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
