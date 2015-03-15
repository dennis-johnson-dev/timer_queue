var AppConstants = require('../constants/AppConstants');
var TaskConstants = require('../constants/TaskConstants');
var _ = require('lodash');
var Marty = require('marty');
var Immutable = require('immutable');

var CHANGE_EVENT = 'change';

var AppStore = Marty.createStore({
  displayName: 'App',
  handlers: {
    setError: AppConstants.ERROR,
    removeError: [ AppConstants.REMOVE, AppConstants.RESOLVE ],
    removeErrors: [
      TaskConstants.CREATE_PROJECT,
      TaskConstants.DELETE_PROJECT,
      TaskConstants.UPDATE_PROJECT,
      TaskConstants.REMOVE_ERRORS
    ]
  },
  getInitialState: function() {
    return {
      errors: new Immutable.List()
    };
  },
  getErrors: function() {
    return this.state.errors.count();
  },
  setError: function(action) {
    this.state.errors = this.state.errors.push({
      id: action.uid,
      msg: action.payload,
      actionId: action.actionId
    });
    this.hasChanged();
  },
  removeError: function(action) {
    let index = this.state.errors.findIndex((error) => {
      return error.id === action.errorId;
    });

    this.state.errors = this.state.errors.delete(index);
    this.hasChanged();
  },
  removeErrors: function() {
    this.state.errors = new Immutable.List();
    this.hasChanged();
  }
});

module.exports = AppStore;