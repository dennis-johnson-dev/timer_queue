/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var TaskStore = require('../store/TaskStore');
var formatTime = require('../lib/formatTime');
var Router = require('react-router');

var ENTER_KEY_CODE = 13;

function getProjectState(id) {
  var project = TaskStore.getProject(id);
  var tasks = project.tasks;
  return {
    id: id,
    play: true,
    project: project,
    tasks: tasks
  };
}

var CountDown = React.createClass({
  displayName: 'CountDown',

  mixins: [ Router.State ],

  getInitialState: function() {
    return getProjectState(this.getParams().id);
  },
  componentWillUnmount: function() {
    clearInterval(this.current);
  },
  start: function() {
    if (!this.current) {
      this.decrement();
      this.current = setInterval(this.decrement, 1000);
      this.setState({ play: false });
    }
  },
  stop: function() {
    clearInterval(this.current);
    this.current = null;
    this.setState({ play: true });
  },
  decrement: function() {
    if (this.state.tasks.length > 0 && this.state.tasks[0].time > 1) {
      let task = this.state.tasks[0];
      task.time -= 1;
      let tasks = this.state.tasks;
      tasks[0] = task;
      this.setState({ tasks: tasks });
    } else if (this.state.tasks.length === 0) {
      this.stop();
    } else {
      this.setState({ tasks: this.state.tasks.slice(1) });
    }
  },
  render: function() {
    var cx = React.addons.classSet;
    var play = this.state.play;
    var classes = cx({
      'glyphicon': true,
      'glyphicon-play': play,
      'glyphicon-pause': !play
    });

    var firstTask = this.state.tasks[0] ? this.state.tasks[0] : { time: 0, desc: '' };

    return (
      <div className="play">
        <h3>{ this.state.project.title }</h3>
        <button className="btn btn-primary" onClick={ this.play }><i className={ classes }></i></button>
        <button className="btn btn-info" onClick={ this.reset }>Reset</button>
        <p className="time-remaining">Time Remaining: <br />
          <span className="curr-total-time">{ formatTime(firstTask.time) }</span>
        </p>
        <p className="curr-task-description">{ firstTask.desc }</p>
        <ul className="tasks">
          {
            this.state.tasks.map(function(task) {
              if (task === firstTask) {
                return;
              }
              return (
                <li className='task' key={ task._id }>
                  <div>
                    <div className="task-time">{ formatTime(task.time) }</div>
                    <div className="task-desc">{ task.desc }</div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  },
  play: function() {
    if (!this.current) {
      this.start();
    } else {
      this.stop();
    }
  },
  reset: function() {
    this.stop();
    var tasks = TaskStore.getProject(this.getParams().id).tasks
    this.setState(
      { 
        tasks: tasks
      }
    );
  }
  
});

module.exports = CountDown;
