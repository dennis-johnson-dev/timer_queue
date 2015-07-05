const Marty = require('marty');

const TaskConstants = Marty.createConstants([
  'CLEANUP_RECORD',
  'RECEIVE_PROJECTS',
  'REVERT_UPDATE',
  'REVERT_UPDATES',
  'CREATE_PROJECT',
  'DELETE_PROJECT',
  'UPDATE_PROJECT'
]);

module.exports = TaskConstants;
