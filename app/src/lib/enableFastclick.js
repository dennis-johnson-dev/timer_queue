var fastclick = require('fastclick');

module.exports = function() {
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      fastclick.attach(document.body);
    }, false);
  }
};