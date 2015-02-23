var AppConstants = require('../constants/AppConstants');
var Marty = require('marty');
var _ = require('lodash');

var AppActions = Marty.createActionCreators({

  error: AppConstants.ERROR(function(errMsg, id) {
    var action = {
      payload: errMsg,
      uid: _.uniqueId(),
      actionId: id
    };

    this.dispatch(action);
  }),

  removeError: AppConstants.REMOVE(function(action) {
    this.dispatch(action);
  }),

  resolveError: AppConstants.RESOLVE(function(action) {
    this.dispatch(action);
  })

});

module.exports = AppActions;