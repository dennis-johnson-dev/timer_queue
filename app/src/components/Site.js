const React = require('react');
const Router = require('react-router');
const RouteHandler = Router.RouteHandler;
const Link = Router.Link;
const fastclick = require('fastclick');

const Site = React.createClass({
  displayName: 'Site',

  componentDidMount: function() {
    fastclick.attach(document.body);
  },

  render: function() {
    return (
      <div className="content">
        <ul className="nav">
          <li><Link to="home">Home</Link></li>
        </ul>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Site;
