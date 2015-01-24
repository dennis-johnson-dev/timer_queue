var to5 = require('6to5');

module.exports = {
  process: function(src) {
    var options = {

    };
    return to5.transform(src, options).code;
  }
};