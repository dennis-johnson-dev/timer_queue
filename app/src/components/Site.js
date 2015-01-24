/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var fastclick = require('fastclick');

var Site = React.createClass({
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
