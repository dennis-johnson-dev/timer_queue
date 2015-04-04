var AppConstants = require('../constants/AppConstants');
var TaskConstants = require('../constants/TaskConstants');
var _ = require('lodash');
var Marty = require('marty');
var Immutable = require('immutable');

var CHANGE_EVENT = 'change';

class AppStore extends Marty.Store {
  constructor(options) {
    super(options);
    this.id = 'AppStore';
    this.state.errors = [];
    this.handlers = {
      setError: AppConstants.ERROR,
      removeError: [ AppConstants.REMOVE, AppConstants.RESOLVE ],
      removeErrors: [
        TaskConstants.REMOVE_ERRORS
      ]
    }
  }

  getErrors() {
    return this.fetch({
      id: 'errors',
      locally() {
        return this.state.errors.length;
      }
    });
  }

  setError(action) {
    this.state.errors = this.state.errors.push({
      id: action.uid,
      msg: action.payload,
      actionId: action.actionId
    });
    this.hasChanged();
  }

  removeError(action) {
    let index = this.state.errors.findIndex((error) => {
      return error.id === action.errorId;
    });

    this.state.errors = this.state.errors.delete(index);
    this.hasChanged();
  }

  removeErrors(errors) {
    this.state.errors = [];
    this.hasChanged();
  }
}

module.exports = Marty.register(AppStore);