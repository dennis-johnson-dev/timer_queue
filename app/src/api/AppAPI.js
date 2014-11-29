var Q = require('q');
var TaskActions = require('../actions/TaskActions');

var AppAPI = {
  init: function() {
    var promise = new Q.Promise(function(resolve, reject) {
      $.ajax({
        crossDomain: true,
        dataType: "json",
        url: '/api/projects',
        success: function(data) {
          resolve(data);
        },
        failure: function(err) {
          reject(err);
        },
        type: 'GET'
      });
    });

    return promise;
  },

  postProject: function(project) {
    $.ajax({
      crossDomain: true,
      dataType: "json",
      data: project,
      url: '/api/projects',
      success: function(data) {
        TaskActions.receiveProject(project);
      },
      failure: function(err) {
        console.log(err);
      },
      type: 'POST'
    });
  }
};

module.exports = AppAPI;
