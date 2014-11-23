/** @jsx React.DOM */
var React = require('react');
var TaskStore = require('../store/TaskStore');
var TaskList = require('./TaskList');
var ProjectList = require('./ProjectList');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var attachFastClick = require('fastclick');


var Site = React.createClass({
  displayName: 'Site',
  componentDidMount: function() {
    attachFastClick(document.body);
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