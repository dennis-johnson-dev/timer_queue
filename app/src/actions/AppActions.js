var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var AppAPI = require('../api/AppAPI');
var Marty = require('marty');
var _ = require('lodash');

var AppActions = Marty.createActionCreators({

  error: AppConstants.ERROR(function(errMsg, id) {
    var action = {
      payload: errMsg,
      uid: id
    }
    console.log('erroar', errMsg);
    // this.dispatch(action);
  })

});

module.exports = AppActions;