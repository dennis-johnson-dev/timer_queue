var AppConstants = require('../constants/AppConstants');
var Marty = require('marty');
var _ = require('lodash');

var AppActions = Marty.createActionCreators({
  id: 'AppActionCreators',

  error: function(errMsg, id) {
    this.dispatch(AppConstants.ERROR, errMsg, id);
  },

  removeError: function(action) {
    this.dispatch(AppConstants.REMOVE, action);
  },

  resolveError: function(action) {
    this.dispatch(AppConstants.RESOLVE, action);
  }

});

module.exports = AppActions;
