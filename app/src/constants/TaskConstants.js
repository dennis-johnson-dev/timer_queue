var Marty = require('marty');

var TaskConstants = Marty.createConstants([
  'CREATE_PROJECT',
  'DELETE_PROJECT',
  'UPDATE_PROJECT',
  'RECEIVE_PROJECTS',
  'OPT_CREATE_PROJECT',
  'OPT_DELETE_PROJECT',
  'OPT_UPDATE_PROJECT',
  'ERROR'
]);

module.exports = TaskConstants;
