import Marty from 'marty';
import React from 'react';

const NotificationItem = React.createClass({
  render() {
    const notification = this.props.notification;
    return (
      <div className="notifications">
        <div key={ notification.id } data-id={ notification.id } className="notification-item">
          <div className="notification-message">
            { notification.msg }
          </div>
          <div className="notification-tools">
            <a href="#" className="notification-tool" onClick={ this._undoChanges }>Undo changes</a>
            <a href="#" className="notification-tool" onClick={ this._retry }>Retry</a>
          </div>
        </div>
      </div>
    );
  },

  _onHideError(e) {
    e.preventDefault();
    this.app.TaskViewActions.resolveError({
      id: e.target.parentNode.parentNode.dataset.id
    });
  },

  _undoChanges(e) {
    e.preventDefault();
    this.app.TaskViewActions.revertUpdate({
      id: e.target.parentNode.parentNode.dataset.id
    });
  },

  _retry() {
    this.app.TaskViewActions.retryRequests();
  }
});

export default Marty.createContainer(NotificationItem);
