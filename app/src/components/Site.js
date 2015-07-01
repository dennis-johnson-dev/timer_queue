const React = require('react');
const Router = require('react-router');
const RouteHandler = Router.RouteHandler;
const Link = Router.Link;
const fastclick = require('fastclick');
import Immutable from 'immutable';
import NotificationItems from './NotificationItems';

const Site = React.createClass({
  displayName: 'Site',

  componentDidMount() {
    fastclick.attach(document.body);
  },

  render() {
    let notifications;
    if (this.props.notifications) {
      notifications = <NotificationItems notifications={ this.props.notifications } />;
    }
    return (
      <div className="content">
        <ul className="nav">
          <li><Link to="home">Home</Link></li>
        </ul>
        { notifications }
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Site;
