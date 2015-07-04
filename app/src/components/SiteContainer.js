const Marty = require('marty');
const Site = require('./Site');

module.exports = Marty.createContainer(Site, {
  listenTo: 'NotificationStore',
  fetch: {
    notification() {
      return this.app.NotificationStore.getNotification('error');
    }
  }
});
