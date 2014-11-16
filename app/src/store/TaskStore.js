var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TaskConstants = require('../constants/TaskConstants');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _projects = [];
var _currentProject = null;

function getTotalTime(tasks) {
  var total = _.reduce(tasks, function(sum, task) {
    return sum += task.time;
  }, 0);
  return total;
}

var TaskStore = _.extend(EventEmitter.prototype, {
  getCurrentProject: function() {
    return _currentProject;
  },
  getProject: function(id) {
    return _currentProject;
  },
  getProjects: function() {
    return _projects;
  },
  getTotalTime: getTotalTime
  ,
  emitChange: function() {
    this.emit(CHANGE_EVENT); 
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback); 
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

var decrement = function() {
  if (_currentProject.tasks.length > 0 && _currentProject.tasks[0].time > 1) {
    _currentProject.tasks[0].time -= 1;
  } else {
    _currentProject = _currentProject.tasks.slice(1);
  }
};

var resetProject = function(time) {
  _currentProject = _.cloneDeep(_projects[0]);
};

var setProjects = function(projects) {
  _currentProject = _.cloneDeep(projects[0]);
  _projects = projects;
};
  
TaskStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

    case TaskConstants.ActionTypes.RECEIVE_PROJECTS:
      setProjects(action.projects);
      break;

    case TaskConstants.ActionTypes.DECREMENT:
      decrement();
      break;

    case TaskConstants.ActionTypes.RESET_PROJECT:
      resetProject(action.project);
      break;

    default:
      return true;
  }

  TaskStore.emitChange();

  return true;
});

module.exports = TaskStore;
