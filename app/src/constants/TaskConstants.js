const Marty = require('marty');

const TaskConstants = Marty.createConstants([
  'RECEIVE_PROJECTS',
  'CREATE_PROJECT',
  'CLEANUP_RECORD',
  'DELETE_PROJECT',
  'UPDATE_PROJECT',
  'REVERT_UPDATE'
]);

module.exports = TaskConstants;
