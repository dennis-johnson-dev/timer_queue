var TaskServerActions = require('../actions/TaskServerActions');
var AppActions = require('../actions/AppActions');
var Marty = require('marty');

var AppAPI = Marty.createStateSource({
  type: 'http',
  init() {
    var options = {
      url: '/api/projects',
      method: 'GET'
    };

    return new Promise((resolve, reject) => {
      this.request(options).then(
        function(res) {
          TaskServerActions.receiveProjects(res.body);
          resolve();
        },
        function(err) {
          AppActions.error('Unable to get project');
          reject(err);
        }
      );
    });
  },

  createProject(project, actionId) {
    var options = {
      url: '/api/projects',
      method: 'POST',
      body: project
    };

    this.request(options).then(
      function() {
        TaskServerActions.createProject(project, actionId);
      },
      function() {
        AppActions.error('Unable to creat project', actionId);
      }
    );
  },

  deleteProject(id, actionId) {
    var options = {
      url: '/api/projects/' + id,
      method: 'DELETE'
    };

    this.request(options).then(
      function() {
        TaskServerActions.deleteProject(id, actionId);
      },
      function() {
        AppActions.error('Unable to delete project', actionId);
      }
    );
  },

  updateProject(project, actionId) {
    var options = {
      url: '/api/projects/' + project.id,
      method: 'PUT',
      body: project
    };

    this.request(options).then(
      function() {
        TaskServerActions.updateProject(project, actionId);
      }, 
      function () {
        AppActions.error('Unable to update project', actionId);
      }
    );
  }
});

module.exports = AppAPI;