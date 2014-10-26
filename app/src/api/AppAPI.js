module.exports = {
  init: function() {
    var promise = new Promise(function(resolve, reject) {
      $.ajax({
        dataType: "json",
        url: 'http://10.0.1.203:3000/api/projects',
        headers: {
          'X-Foo': 'bar'
        },
        success: function(data) {
          resolve(data)
        }
      });
    });

    return promise;
  }
};
