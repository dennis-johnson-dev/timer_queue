/** @jsx React.DOM */
var React = require('react');
var TaskStore = require('../store/TaskStore');
var ProjectList = require('./ProjectList');
var CountDown = require('./CountDown');

var Site = React.createClass({
  displayName: 'Site',

  getInitialState: function() {
    return {
      project: TaskStore.getCurrentProject()
    }
  },

  componentDidMount: function() {
    TaskStore.addChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="content">
        <ul className="nav">
          <li><a href="/#">Home</a></li>
        </ul>
        <CountDown project={ this.state.project }/>
      </div>
    );
  },

  _onChange: function() {
    this.setState({ project: TaskStore.getCurrentProject() });
  }

});

module.exports = Site;