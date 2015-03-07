/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var TaskStore = require('../stores/TaskStore');
var formatTime = require('../lib/formatTime');
var Marty = require('marty');
var Immutable = require('immutable');

var ENTER_KEY_CODE = 13;

var CountDown = React.createClass({

  displayName: 'CountDown',

  getInitialState: function() {
    return {
      play: true,
      tasks: Immutable.List(this.props.tasks)
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      tasks: Immutable.List(nextProps.tasks)
    });
  },

  componentWillUnmount: function() {
    clearInterval(this.current);
  },
  start: function() {
    if (!this.current) {
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
    let task = this.state.tasks.get(0);
    if (this.state.tasks.count() > 0 && task.time > 1) {

      this.setState({ 
        tasks: this.state.tasks.update(
          0, (task) => {
           task.time -=1;
           return task;
          }
        ) 
      });

    } else if (this.state.tasks.count() === 0) {
      this.stop();
    } else {
      this.setState({ tasks: this.state.tasks.shift() });
      if (this.state.tasks.count() === 0) {
        this.stop();
      }
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

    var firstTask = this.state.tasks.get(0) ? this.state.tasks.get(0) : { time: 0, desc: '' };

    return (
      <div className="play">
      <h3>{ this.props.title }</h3>
      <button className="btn btn-primary" onClick={ this.play }><i className={ classes }></i></button>
      <button className="btn btn-info" onClick={ this.reset }>Reset</button>
      <p className="time-remaining">Time Remaining: <br />
      <span className="curr-total-time">{ formatTime(firstTask.time) }</span>
      </p>
      <p className="curr-task-description">{ firstTask.desc }</p>
      <ul className="tasks">
      {
        this.state.tasks.toArray().map(function(task) {
          if (task === firstTask) {
            return;
          }
          return (
            <li className='task' key={ task.id }>
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
    this.props.reset();
  }

});

module.exports = CountDown;
