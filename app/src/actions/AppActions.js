var AppConstants = require('../constants/AppConstants');
var Marty = require('marty');

class AppActions extends Marty.createActionCreators {

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