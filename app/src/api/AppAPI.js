const AppActions = require('../actions/AppActions');
const Marty = require('marty');
require('marty').HttpStateSource.removeHook('parseJSON');
const OptimisticStore = require('../stores/OptimisticStore');
const Helper = require('./Helper');

export default class AppAPI extends Marty.HttpStateSource {
  requester(options, action) {
    return this.request(options).then((res) => {
      if (res.ok) {
        return res.json().then((body) => {
          return {
            body,
            action
          };
        });
      }
    });
  }
}
