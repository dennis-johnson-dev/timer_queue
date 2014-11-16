/** @jsx React.DOM */
var React = require('react');
var TaskStore = require('../store/TaskStore');

var CountDown = require('./CountDown');

var ProjectList = React.createClass({
  displayName: 'ProjectList',

  getInitialState: function() {
    return {
      projects: TaskStore.getProjects()
    };
  },

  componentDidMount: function() {
    // this._onCLick.bind(this);
    TaskStore.addChangeListener(this._onChange); 
  },

  componentWillUnmount: function() {
    TaskStore.removeChangeListener(this._onChange); 
  },

  render: function() {
  	return (
      <div>
        <h3>Projects</h3>
        <CountDown id={ this.state.projects[0] } />
      </div>
    );
  },

  _onChange: function() {
    this.setState({ projects: TaskStore.getProjects() });
  },

  _onClick: function(e) {
    console.log('yo');
  }

});

module.exports = ProjectList;