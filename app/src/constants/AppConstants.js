var Marty = require('marty');

var AppConstants = Marty.createConstants([
  'ERROR',
  'REMOVE',
  'RESOLVE',
  'RETRY'
]);

module.exports = AppConstants;
