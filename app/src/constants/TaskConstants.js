const Marty = require('marty');

const TaskConstants = Marty.createConstants([
  'CLEANUP_RECORD',
  'RECEIVE_PROJECTS',
  'REVERT_UPDATE',
  'REVERT_UPDATES',
  'CREATE_PROJECT_OPTIMISTIC',
  'DELETE_PROJECT_OPTIMISTIC',
  'UPDATE_PROJECT_OPTIMISTIC'
]);

module.exports = TaskConstants;
