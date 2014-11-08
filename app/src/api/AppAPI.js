var Q = require('q');

module.exports = {
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
  }
};
