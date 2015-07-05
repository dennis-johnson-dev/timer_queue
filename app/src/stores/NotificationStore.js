import _ from 'lodash';
import AppConstants from '../constants/AppConstants';
import Immutable from 'immutable';
import Marty from 'marty';
import TaskConstants from '../constants/TaskConstants';

export default class NotificationStore extends Marty.Store {
  constructor(options) {
    super(options);
    this.handlers = {
      _setNotification: AppConstants.ERROR,
      _removeNotification: [ AppConstants.RESOLVE_ERROR, TaskConstants.REVERT_UPDATE ],
      _removeNotifications: AppConstants.RESOLVE_ERRORS
    };
    this.state = {
      notifications: Immutable.Map()
    };
  }

  getInitialState() {
    return {
      notifications: Immutable.Map()
    };
  }

  rehydrate(newState) {
  }

  getNotification() {
    return this.fetch({
      id: 'notifications',
      locally: function() {
        return this.state.notifications;
        // return this.state.notifications.get(typeKey) && this.state.notifications.get(typeKey).last() || false;
      }
    });
  }

  _setNotification(notification) {
    let notifications;
    const typeKey = notification.typeKey || 'error';
    const notificationsByType = this.state.notifications.get(typeKey);

    if (notificationsByType) {
      notifications = this.state.notifications.set(typeKey, notificationsByType.push(notification));
    } else {
      notifications = this.state.notifications.set(typeKey, Immutable.List([notification]));
    }

    this.state.notifications = notifications;
    this.hasChanged();
  }

  _removeNotification(error) {
    const index = this.state.notifications.get('error').findIndex((notification) => {
      return notification.id === error.id;
    });

    this.state.notifications = this.state.notifications.set('error',
      this.state.notifications.get('error').delete(index)
    );
    this.hasChanged();
  }

  _removeNotifications(errors) {
    if (!errors) {
      return;
    }
    errors.forEach((error) => {
      this._removeNotification(error);
    });
  }
}
