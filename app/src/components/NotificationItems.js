import Marty from 'marty';
import React from 'react';

const NotificationItems = React.createClass({
  // <a className="notification-item-close" data-id={ notification.id } href="#" onClick={ this._onHideError }>
  //   <i className="glyphicon glyphicon-remove"></i>
  // </a>
  render() {
    return (
      <div className="notifications">
        {
          this.props.notifications.map((notification) => {
            return (
              <div key={notification.id} data-id={ notification.id } className="notification-item">
                { notification.msg }
                <button onClick={ this._onHideError }>Dimiss</button>
                <button onClick={ this._undoChanges }>Undo changes</button>
                <button onClick={ this._retry }>Retry</button>
              </div>
            );
          })
        }
      </div>
    );
  },

  _onHideError(e) {
    this.app.TaskViewActions.resolveError({
      id: e.target.parentNode.dataset.id
    });
  },

  _undoChanges(e) {
    this.app.TaskViewActions.revertUpdate({
      id: e.target.parentNode.dataset.id
    });
  },

  _retry() {
    this.app.TaskViewActions.retryRequests();
  }
});

export default Marty.createContainer(NotificationItems);
