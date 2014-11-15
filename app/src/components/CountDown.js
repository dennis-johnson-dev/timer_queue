/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var TaskStore = require('../store/TaskStore');
var TaskActions = require('../actions/TaskActions');
var TaskList = require('./TaskList');
var formatTime = require('../lib/formatTime');

var ENTER_KEY_CODE = 13;

function getProjectState(id) {
  var project = TaskStore.getProject(id);
  var tasks = project.tasks;
  var total = TaskStore.getTotalTime(tasks);
  return {
    id: id,
    project: project,
    tasks: tasks,
    total: total
  };
}

var CountDown = React.createClass({
  displayName: 'CountDown',

  getInitialState: function() {
    this.project = getProjectState(this.props.params.id).project;
    return getProjectState(this.props.params.id);
  },
  componentDidMount: function() {
    TaskStore.addChangeListener(this._onChange);
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
        <h4>{ this.state.project.title }</h4>
        <button onClick={ this.start }>Play</button>
        <button onClick={ this.stop }>Pause</button>
        <button onClick={ this.reset }>Reset</button>
        <p>{ formatTime(this.state.total) }: Time Remaining</p>
        <ul>
          {
            this.state.tasks.map(function(task) {
              return (
                <li key={ task._id }>
                  <div>
                    <div>{ formatTime(task.time) }</div>
                    <div>{ task.title }</div>
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
    console.log(this.project);
    this._onChange();
  },
  _onChange: function() {
    this.setState(getProjectState(this.state.id));
  }
  
});

module.exports = CountDown;