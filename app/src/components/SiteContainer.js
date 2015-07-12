const React = require('react');
const Marty = require('marty');
const Site = require('./Site');

module.exports = Marty.createContainer(Site, {
  listenTo: 'NotificationStore',
  fetch: {
    notification() {
      return this.app.NotificationStore.getNotifications();
    }
  },
  pending(results) {
    return this.done(results);
  },
  done(results) {
    const error = results.notification.get('error');
    let notification;

    if (error) {
      notification = error.last();
    }

    return <Site notification={ notification } ref="innerComponent" />;
  }
});
