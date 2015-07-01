const Marty = require('marty');
const Site = require('./Site');

module.exports = Marty.createContainer(Site, {
  listenTo: 'NotificationStore',
  fetch: {
    notifications() {
      return this.app.NotificationStore.getNotifications('error');
    }
  }
});
