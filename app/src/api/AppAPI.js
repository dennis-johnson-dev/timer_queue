var Q = require('q');

module.exports = {
  init: function() {
    var promise = new Q.Promise(function(resolve, reject) {
      $.ajax({
        crossDomain: true,
        dataType: "json",
        url: 'http://10.0.1.4:3000/api/projects',
        success: function(data) {
          resolve(data)
        },
        type: 'GET'
      });
    });

    return promise;
  }
};
