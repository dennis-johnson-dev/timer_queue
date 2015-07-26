const React = require('react/addons');
const _ = require('lodash');
const TaskStore = require('../stores/TaskStore');
const formatTime = require('../lib/formatTime');
const Marty = require('marty');
const Immutable = require('immutable');
const classnames = require('classnames');

const ENTER_KEY_CODE = 13;

const CountDown = React.createClass({

  displayName: 'CountDown',

  getInitialState() {
    const project = this.props.project;
    const tasks = project.get('tasks');
    return {
      play: true,
      complete: false,
      project,
      tasks
    };
  },

  componentWillUnmount() {
    if (this.current) {
      clearInterval(this.current);
    }
  },

  _getInterval({func, time}) {
    return setInterval(func, time);
  },

  start() {
    const intervalOptions = {
      func: this.decrement,
      time: 1000
    };
    if (!this.current) {
      if (this.state.complete) {
        this.reset();
      }
      this.current = this._getInterval(intervalOptions);
      this.setState({ play: false });
    }
  },

  stop() {
    clearInterval(this.current);
    this.current = null;
    this.setState({ play: true });
  },

  decrement() {
    let task = this.state.tasks.get(0);

    if (this.state.tasks.count() > 0 && task.get('time') > 1) {

      const newTasks = this.state.tasks.update(0, (task) => {
        let time = task.get('time');
        return task.set('time', time -= 1);
      });

      this.setState({
        tasks: newTasks
      });

    } else {

      this.setState({
        tasks: this.state.tasks.shift()
      });
      if (this.state.tasks.count() === 0) {
        this.stop();
        this.setState({
          complete: true
        });
      }
    }
  },

  render() {
    if (!this.props.project) {
      return null;
    }
    const tasks = this.state.tasks;
    const play = this.state.play;
    const classes = classnames({
      'glyphicon': true,
      'glyphicon-play': play,
      'glyphicon-pause': !play
    });

    // move Map call outside of render
    const firstTask = tasks.get(0) ? tasks.get(0) : Immutable.Map({ time: 0, desc: '' });

    return (
      <div className="play">
      <h3>{ this.props.project.get('title') }</h3>
      <button className="btn btn-primary" onClick={ this.play }><i className={ classes }></i></button>
      <button className="btn btn-info" onClick={ this.reset }>Reset</button>
      <p className="time-remaining">Time Remaining: <br />
      <span className="curr-total-time">{ formatTime(firstTask.get('time')) }</span>
      </p>
      <p className="curr-task-description">{ firstTask.get('desc') }</p>
      <ul className="tasks">
      {
        tasks.map((task) => {
          if (task === firstTask) {
            return;
          }
          return (
            <li className='task' key={ task.get('id') }>
              <div>
                <div className="task-time">{ formatTime(task.get('time')) }</div>
                <div className="task-desc">{ task.get('desc') }</div>
              </div>
            </li>
          );
        }).toJS()
      }
      </ul>
      </div>
    );
  },

  play() {
    if (!this.current) {
      this.start();
    } else {
      this.stop();
    }
  },

  reset() {
    this.stop();
    this.state.tasks = this.props.project.get('tasks');
  }

});

module.exports = CountDown;
