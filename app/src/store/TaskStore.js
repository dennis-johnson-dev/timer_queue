var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TaskConstants = require('../constants/TaskConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _tasks = [];

function create() {
  var insert = {
    id: 3,
    title: 'Task 3',
    time: 3
  };

  _tasks.push(insert);
}

var TaskStore = merge(EventEmitter.prototype, {
  init: function(data) {
    _tasks = data; 
  },
  getAll: function() {
    return _tasks;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT); 
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback); 
  }
});
  
TaskStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case TaskConstants.TASK_CREATE:
      create();
      break;

    default:
      return true;
  }

  TaskStore.emitChange();

  return true;
});

module.exports = TaskStore;
