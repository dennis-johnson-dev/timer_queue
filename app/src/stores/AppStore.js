var AppConstants = require('../constants/AppConstants');
var TaskConstants = require('../constants/TaskConstants');
var _ = require('lodash');
var Marty = require('marty');
var Immutable = require('immutable');

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
        if (this.state.errors.length > 0) {
          return this.state.errors.length;
        } else {
          return Promise.resolve(0);
        }
      }
    });
  }

  setError(action) {
    this.state.errors.push({
      id: action.uid,
      msg: action.payload,
      actionId: action.actionId
    });
    this.hasChanged();
  }

  removeError(action) {
    const index = _.findIndex(this.state.errors, (error) => {
      return error.id === action.errorId;
    });

    this.state.errors.splice(index, 1);
    this.hasChanged();
  }

  removeErrors(errors) {
    this.state.errors = [];
    this.hasChanged();
  }
}

module.exports = Marty.register(AppStore);
