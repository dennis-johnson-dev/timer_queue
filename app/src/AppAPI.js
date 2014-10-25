module.exports = {
  init: function() {
    var promise = new Promise(function(resolve, reject) {
      $.ajax({
        dataType: "json",
        url: 'http://localhost:3000/api/projects',
        success: function(data) {
          resolve(data)
        }
      });
    });

    return promise;
  },

  createTask: function() {
    
  }
};