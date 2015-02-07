var Marty = require('marty');

var TaskConstants = Marty.createConstants([
  'CREATE_PROJECT',
  'DELETE_PROJECT',
  'UPDATE_PROJECT',
  'RECEIVE_PROJECTS'
]);

module.exports = TaskConstants;
