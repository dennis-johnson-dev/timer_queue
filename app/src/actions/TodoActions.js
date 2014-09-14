var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');

var TaskActions = {

  create: function() {
    AppDispatcher.handleViewAction({
      actionType: TaskConstants.Task_CREATE
    });
  }

};

module.exports = TaskActions;
