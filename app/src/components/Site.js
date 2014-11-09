/** @jsx React.DOM */
var React = require('react');
var TaskStore = require('../store/TaskStore');
var TaskList = require('./TaskList');
var ProjectList = require('./ProjectList');
var Router = require('react-router');
var Link = Router.Link;

var Site = React.createClass({
  displayName: 'Site',

  render: function() {
    return (
      <div className="content">
        <ul className="nav">
          <li><Link to="home">Home</Link></li>
        </ul>
        <ProjectList />
        <this.props.activeRouteHandler />
      </div>
    );
  }

});

module.exports = Site;