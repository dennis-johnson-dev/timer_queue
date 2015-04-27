var TaskServerActions = require('../actions/TaskServerActions');
var AppActions = require('../actions/AppActions');
var Marty = require('marty');
var OptimisticStore = require('../stores/OptimisticStore');
var Helper = require('./Helper');
var request = require('superagent');

var requester;
class AppAPI extends Marty.HttpStateSource {
  constructor(options) {
    super(options);
    this.baseUrl = 'http://localhost:3000';
  }

  getProjects() {
    const url = 'http://localhost:3000/api/projects';
    const options = {
      method: 'GET'
    };
    const stuff = {
      url: 'http://localhost:3000/api/projects',
      method: 'GET'
    };

    /*return Promise.resolve({
      body: [
        {
          _id: '553702bc2fb9304ac2ad4e80',
          id: '47e67c562a6324d211a122ba9189edc1',
          title: '',
          __v: 1,
          tasks: [
            {
              _id: "553c511ac2b2931d402a1574",
              desc: "",
              id: "be2267c4e8bc2156d0f144ed3ea076f2",
              time: 0,
              title: ""
            }
          ]
        },
        {
          _id: '553c511ac2b2931d402a1573',
          id: 'cd2a641c038690b19f92fcae5b796f19',
          title: 'hi',
          __v: 0,
          tasks: [
            {
              _id: "553c511ac2b2931d402a1574",
              desc: "",
              id: "be2267c4e8bc2156d0f144ed3ea076f2",
              time: 0,
              title: ""
            }
          ]
        }
      ]
    });*/
    return new Promise(function(resolve, reject) {
      console.log('at api')
      try {
        request
          .get('http://localhost:3000/api/projects')
          .end(function(err, res) {
            console.log('has projects')
            resolve(res);
          });
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  getProject(id) {
    var options = {
      url: `/api/projects/${id}`,
      method: 'GET'
    };
    return this.request(options);
  }

  createProject(project, actionId, options) {
    return this.flush().then(function() {
      TaskServerActions.createProject(project, actionId);
    }, function(err) {
      AppActions.error('Unable to creat project', actionId, options);
    });
  }

  deleteProject(id, actionId, options) {
    return this.flush().then(function() {
      TaskServerActions.deleteProject(id, actionId);
    },
    function() {
      AppActions.error('Unable to delete project', actionId, options);
    });
  }

  updateProject(project, actionId, options) {
    return this.flush().then(function() {
      TaskServerActions.updateProject(project, actionId);
    },
    function () {
      AppActions.error('Unable to update project', actionId, options);
    });
  }

  flush() {
    var requests = OptimisticStore.getRequests().result;
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
};

module.exports = Marty.register(AppAPI);
