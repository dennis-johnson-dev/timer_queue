var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TaskConstants = require('../constants/TaskConstants');
var merge = require('react/lib/merge');

var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _projects = [];

function getTotalTime(id) {
  var tasks = _.find(_projects, { '_id': id }).tasks;
  var total = _.reduce(tasks, function(sum, task) {
    return sum += task.time;
  }, 0);
  return total;
}

var TaskStore = merge(EventEmitter.prototype, {
  getProject: function(id) {
    return _.find(_projects, { '_id': id });
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
  }
});

var setProjects = function(projects) {
  _projects = projects;
};
  
TaskStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

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
