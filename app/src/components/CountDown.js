/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var TaskStore = require('../store/TaskStore');
var TaskActions = require('../actions/TaskActions');
var formatTime = require('../lib/formatTime');
var Router = require('react-router');

var ENTER_KEY_CODE = 13;

function getProjectState(id) {
  var project = TaskStore.getProject(id);
  var tasks = project.tasks;
  var total = TaskStore.getTotalTime(tasks);
  return {
    id: id,
    play: true,
    project: project,
    tasks: tasks,
    total: total
  };
}

var CountDown = React.createClass({
  displayName: 'CountDown',

  mixins: [ Router.State ],

  getInitialState: function() {
    return getProjectState(this.getParams().id);
  },
  componentDidMount: function() {
    TaskStore.addChangeListener(this._onChange);
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
    var cx = React.addons.classSet;
    var play = this.state.play;
    var classes = cx({
      'fa': true,
      'fa-play': play,
      'fa-pause': !play
    });
    var firstTask = _.cloneDeep(this.state.tasks[0]);
    return (
      <div className="play">
        <h3>{ this.state.project.title }</h3>
        <button className="btn btn-primary" onClick={ this.play }><i className={ classes }></i></button>
        <button className="btn btn-info" onClick={ this.reset }>Reset</button>
        <p className="time-remaining">Time Remaining: <br />
          <span className="total-time">{ formatTime(this.state.total) }</span>
        </p>
        <ul className="tasks">
          {
            this.state.tasks.map(function(task) {
              var taskItem = _.isEqual(task, firstTask) ? 'task task-current' : 'task';
              return (
                <li className={ taskItem } key={ task._id }>
                  <div>
                    <div className="task-time">{ formatTime(task.time) }</div>
                    <div className="task-desc">{ task.title }</div>
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
    this._onChange();
    this.stop();
  },
  _onChange: function() {
    this.setState(getProjectState(this.state.id));
  }
  
});

module.exports = CountDown;