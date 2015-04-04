var AppConstants = require('../constants/AppConstants');
var Marty = require('marty');
var Immutable = require('immutable');
var TaskConstants = require('../constants/TaskConstants');

var CHANGE_EVENT = 'change';

class OptimisticStore extends Marty.Store {
  constructor() {
    super({});
    this.id = 'OptimisticStore';
    this.handlers = {
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
    };
    this.state = {
      requests: [],
      updates: []
    };
  }
  getRequests() {
    return this.fetch({
      id: 'requests',
      locally() {
        return this.state.requests;
      }
    });
  }
  getUpdates() {
    return this.fetch({
      id: 'updates',
      locally() {
        return this.state.updates;
      }
    });
  }
  addRequest(payload, uid, apiOptions) {
    console.log('adding request', payload);
    var request = Object.assign(apiOptions, { uid });
    this.state.requests.push(request);
    this.state.updates.push(payload);
  }
  removeRequest(project, actionId) {
    const index = _.remove(this.state.requests, function(request) {
      return request.uid === actionId;
    });
  }
  flushRequests() {
    this.state.requests = [];
    this.state.updates = [];
  }
}

module.exports = Marty.register(OptimisticStore);