var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TaskConstants = require('../constants/TaskConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _tasks = [];
var _projects = [];

function create(task) {
  var insert = {
    id: task.id,
    time: task.time,
    title: task.title,
    desc: task.desc
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
  getProjects: function() {
    return _projects;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT); 
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback); 
  }
});

var setProjects = function(projects) {
  _projects = projects;
};
  
TaskStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case TaskConstants.ActionTypes.TASK_CREATE:
      create(action.task);
      break;

    case TaskConstants.ActionTypes.RECEIVE_PROJECTS:
      setProjects(action.projects);
      break;

    default:
      return true;
  }

  TaskStore.emitChange();

  return true;
});

module.exports = TaskStore;
