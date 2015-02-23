var AppConstants = require('../constants/AppConstants');
var _ = require('lodash');
var Marty = require('marty');
var Immutable = require('immutable');

var CHANGE_EVENT = 'change';

var AppStore = Marty.createStore({
  displayName: 'App',
  handlers: {
    setError: AppConstants.ERROR,
    removeError: [ AppConstants.REMOVE, AppConstants.RESOLVE ]
  },
  getInitialState: function() {
    return {
      errors: new Immutable.List()
    };
  },
  getErrors: function() {
    return this.state.errors.toJS();
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
  }
});

module.exports = AppStore;