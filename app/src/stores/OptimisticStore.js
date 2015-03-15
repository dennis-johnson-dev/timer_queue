var AppConstants = require('../constants/AppConstants');
var Marty = require('marty');
var Immutable = require('immutable');
var TaskConstants = require('../constants/TaskConstants');

var CHANGE_EVENT = 'change';

var OptimisticStore = Marty.createStore({
  displayName: 'Optimistic Store',
  handlers: {
    addRequest: [
      TaskConstants.VIEW_CREATE_PROJECT, 
      TaskConstants.VIEW_DELETE_PROJECT,
      TaskConstants.VIEW_UPDATE_PROJECT
    ],
    removeRequest: [
      TaskConstants.CREATE_PROJECT,
      TaskConstants.DELETE_PROJECT,
      TaskConstants.UPDATE_PROJECT
    ],
    flushRequests: TaskConstants.FLUSH_REQUESTS
  },
  getInitialState: function() {
    return {
      requests: new Immutable.List(),
      updates: []
    };
  },
  getRequests: function() {
    return this.state.requests.toArray();
  },
  getUpdates: function() {
    return this.state.updates;
  },
  addRequest: function(payload, uid, apiOptions) {
    var request = Object.assign(apiOptions, { uid });
    this.state.requests = this.state.requests.push(request);
    this.state.updates.push(payload);
  },
  removeRequest: function(project, actionId) {
    const index = this.state.requests.findIndex(function(request) {
      return request.uid === actionId;
    });
    if (index > -1) {
      this.state.requests = this.state.requests.delete(index);
    }
  },
  flushRequests: function() {
    this.state.requests = new Immutable.List();
    this.state.updates = [];
  }
});

module.exports = OptimisticStore;