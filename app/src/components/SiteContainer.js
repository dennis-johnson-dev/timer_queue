const React = require('react');
const Marty = require('marty');
const Site = require('./Site');

module.exports = Marty.createContainer(Site, {
  listenTo: 'NotificationStore',
  fetch: {
    notification() {
      return this.app.NotificationStore.getNotification();
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

    return <Site ref="innerComponent" />;
    // return <Site {...notification} ref="innerComponent" />;
  }
});
