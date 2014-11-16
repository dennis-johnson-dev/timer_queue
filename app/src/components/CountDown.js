/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var TaskActions = require('../actions/TaskActions');
var formatTime = require('../lib/formatTime');

var ENTER_KEY_CODE = 13;

var CountDown = React.createClass({
  displayName: 'CountDown',

  start: function() {
    if (!this.current) {
      this.current = setInterval(this.decrement, 1000); 
    }
  },
  stop: function() {
    clearInterval(this.current);
    console.log('stopped');
    this.current = null;
  },
  decrement: function() {
    TaskActions.decrement();
  },
  render: function() {
    var project = this.props.project;
    var tasks = this.props.project.tasks;
    return (
      <div className="play">
        { tasks[0].time }
        <button onClick={ this.start }>Play</button>
        <button onClick={ this.stop }>Pause</button>
        <button onClick={ this.reset }>Reset</button>
      </div>
    );
  },
  reset: function() {
    TaskActions.reset();
  }
  
});

module.exports = CountDown;