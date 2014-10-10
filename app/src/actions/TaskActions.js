var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');

var TaskActions = {

  create: function(task) {
    AppDispatcher.handleViewAction({
      actionType: TaskConstants.TASK_CREATE,
      task: task
    });
  }

};

module.exports = TaskActions;
