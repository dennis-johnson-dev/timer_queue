const React = require('react');
const Router = require('react-router');
const RouteHandler = Router.RouteHandler;
const Link = Router.Link;
import Immutable from 'immutable';
import NotificationItem from './NotificationItem';

const Site = React.createClass({
  displayName: 'Site',

  render() {
    let notification;
    if (this.props.notification) {
      notification = <NotificationItem notification={ this.props.notification } />;
    }
    return (
      <div className="content">
        <ul className="nav">
          <li><Link to="home">Home</Link></li>
        </ul>
        { notification }
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Site;
