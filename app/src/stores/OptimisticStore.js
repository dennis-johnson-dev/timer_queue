var AppConstants = require('../constants/AppConstants');
var TaskConstants = require('../constants/TaskConstants');
var _ = require('lodash');
var Marty = require('marty');
var Immutable = require('immutable');

var CHANGE_EVENT = 'change';

// Todo: Make REAL queue...
var actionQueue = [];

var OptimisticStore = Marty.createStore({
  displayName: 'Optimistic Store',
  handlers: {
    createProject: TaskConstants.VIEW_CREATE_PROJECT
  },
  getInitialState: function() {
    return {
      projects: new Immutable.List()
    };
  },
  getProject: function(id) {
    let index = this.state.projects.findIndex(function(project) {
      return project.id === id;
    });

    let project;
    if (index > -1) {
      console.log('yo');
      return _.cloneDeep(this.state.projects.get(index));
    } else {
      return null;
    }
  },
  createProject: function(project, actionid) {
    this.state.projects = this.state.projects.push(project);
  }
});

module.exports = OptimisticStore;