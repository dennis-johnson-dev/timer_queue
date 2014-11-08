/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var TaskStore = require('../store/TaskStore');
var TaskActions = require('../actions/TaskActions');
var TaskList = require('./TaskList');
var formatTime = require('../mixins/formatTime');

var ENTER_KEY_CODE = 13;

function getTaskState() {
  return TaskStore.getAll();
}

var CountDown = React.createClass({
  displayName: 'CountDown',
  mixins: [formatTime],

  getInitialState: function() {
    var project = TaskStore.getProject(this.props.params.id);
    var tasks = project.tasks;
    return {
      project: project,
      tasks: tasks,
      total: TaskStore.getTotalTime(this.props.params.id)
    };
  },
  componentDidMount: function() {

  },
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
    if (this.state.tasks.length > 0 && this.state.tasks[0].time > 1) {
      this.state.tasks[0].time -= 1;
    } else {
      this.setState({ tasks: this.state.tasks.slice(1) });
    }

    if ((this.state.total) > 0) {
      this.setState({ total: this.state.total - 1 }); 
    } else {
      this.stop(); 
    }
  },
  render: function() {
    return (
      <div className="play">
        <h4>Play { this.state.project.title }</h4>
        <button onClick={ this.start }>Play</button>
        <button onClick={ this.stop }>Pause</button>
        <p>Total: { formatTime(this.state.total) }</p>
        <ul>
          {
            this.state.tasks.map(function(task) {
              return (
                <li key={ task.id }>
                  <div>
                    <div>{ task.title }</div>
                    <div>{ formatTime(task.time) }</div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  },
  reset: function() {
    console.log('reset');
  }
  
});

module.exports = CountDown;