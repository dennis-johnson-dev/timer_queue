var TaskServerActions = require('../actions/TaskServerActions');
var AppActions = require('../actions/AppActions');
var Marty = require('marty');
var OptimisticStore = require('../stores/OptimisticStore');
var Helper = require('./Helper');

var requester;
class AppAPI extends Marty.HttpStateSource {

  getProjects() {
    var options = {
      url: '/api/projects',
      method: 'GET'
    };

    this.request(options);
  }

  createProject(project, actionId, options) {
    this.flush().then(function() {
      TaskServerActions.createProject(project, actionId);
    }, function(err) {
      AppActions.error('Unable to creat project', actionId, options);
    });
  }

  deleteProject(id, actionId, options) {
    this.flush().then(function() {
      TaskServerActions.deleteProject(id, actionId);
    },
    function() {
      AppActions.error('Unable to delete project', actionId, options);
    });
  }

  updateProject(project, actionId, options) {
    this.flush().then(function() {
      TaskServerActions.updateProject(project, actionId);
    }, 
    function () {
      AppActions.error('Unable to update project', actionId, options);
    });
  }

  flush() {
    var requests = OptimisticStore.for(this).getRequests().result;
    var requestQueue = [];
    let fetcher = this.request;

    requests.forEach((request) => {
      var options = {
        url: request.url,
        method: request.method,
        body: JSON.stringify(request.body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        uid: request.uid
      };

      if (request.method === 'DELETE') {
        options.headers = {};
        options.body = "";
      }

      requestQueue.push(options);
    });

    return Helper.wrapper(requestQueue, fetcher).then(function() {
      TaskServerActions.removeErrors();
    }, function({ err, results }) {
      TaskServerActions.removeErrors(results);
      return Promise.reject(err);
    });
  }
}
module.exports = Marty.register(AppAPI);