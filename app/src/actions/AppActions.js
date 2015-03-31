var AppConstants = require('../constants/AppConstants');
var Marty = require('marty');
var _ = require('lodash');

class AppActions extends Marty.ActionCreators {
  id: 'AppActionCreators'
  displayName: 'AppActionCreators'

  error(errMsg, id) {
    this.dispatch(AppConstants.ERROR, errMsg, id);
  }

  removeError(action) {
    this.dispatch(AppConstants.REMOVE, action);
  }

  resolveError(action) {
    this.dispatch(AppConstants.RESOLVE, action);
  }

}

module.exports = Marty.register(AppActions);