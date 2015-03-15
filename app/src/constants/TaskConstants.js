var Marty = require('marty');

var TaskConstants = Marty.createConstants([
  'VIEW_CREATE_PROJECT',
  'VIEW_DELETE_PROJECT',
  'VIEW_UPDATE_PROJECT',
  'CREATE_PROJECT',
  'DELETE_PROJECT',
  'UPDATE_PROJECT',
  'RECEIVE_PROJECTS',
  'FLUSH_REQUESTS',
  'RETRY_REQUESTS',
  'REMOVE_ERRORS'
]);

module.exports = TaskConstants;
