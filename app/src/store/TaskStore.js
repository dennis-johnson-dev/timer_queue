var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TaskConstants = require('../constants/TaskConstants');
var _ = require('lodash');

var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _projects = [];

function getTotalTime(tasks) {
  var total = _.reduce(tasks, function(sum, task) {
    return sum += task.time;
  }, 0);
  return total;
}

var TaskStore = _.extend(EventEmitter.prototype, {
  getProject: function(id) {
    return _.cloneDeep(_.find(_projects, { '_id': id }));
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

var setProjects = function(projects) {
  _projects = projects;
};

var createProject = function(project) {
  _projects.push(project);
};

var deleteProject = function(id) {
  var removedItem = _.remove(_projects, { '_id': id });
}

var updateProject = function(project) {
  var elementIndex = _.findIndex(_projects, function(proj) {
    return proj._id === project._id;
  });

  _projects[elementIndex] = project;
}
  
TaskStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

    case TaskConstants.ActionTypes.RECEIVE_PROJECTS:
      setProjects(action.projects);
      break;

    case TaskConstants.ActionTypes.CREATE_PROJECT:
      createProject(action.project);
      break;

    case TaskConstants.ActionTypes.DELETE_PROJECT:
      deleteProject(action.id);
      break;  

    case TaskConstants.ActionTypes.UPDATE_PROJECT:
      updateProject(action.project)
      break;  

    default:
      return true;
  }

  TaskStore.emitChange();

  return true;
});

module.exports = TaskStore;
