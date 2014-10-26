/** @jsx React.DOM */
var React = require('react');
var TaskStore = require('../store/TaskStore');
var TaskActions = require('../actions/TaskActions');
var TaskList = require('./TaskList');

var ENTER_KEY_CODE = 13;

function getTaskState() {
  return TaskStore.getAll();
}

function getTotalTime(tasks) {
  var total = 0;
  tasks.forEach(function(task) {
    total += task.time;
  });
  return total;
}

var CountDown = React.createClass({
  displayName: 'CountDown',

  getInitialState: function() {
    return {
      tasks: TaskStore.getProject(this.props.params.id).tasks
    };
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
  _formatTime: function(total) {
    var hours = 0;
    var minutes = 0;
    while (total > 3600) {
      if (total/3600 > 0) {
        hours += Math.floor(total/3600);
        total -= hours * 3600;
      }
    }
    while (total > 60) {
      if (total/60 > 0) {
        minutes += Math.floor(total/60);
        total -= minutes * 60;
      }
    }
    hours = hours < 10 ? '0' + hours + ':' : hours + ':'; 
    minutes = minutes < 10 ? '0' + minutes + ':' : minutes + ':';    
    total = total < 10 ? '0' + total : total;
    var formattedTime = hours + minutes + total;
    return formattedTime;
  },
  render: function() {
    var tasks = this.state.tasks.map(function(task) {
      return {
        id: task.id,
        time: this._formatTime(task.time),
        title: task.title,
        desc: task.desc
      };
    });
    var formattedTotal = this._formatTime(this.state.total);

    return (
      <div>
        <div>
          <p ref="total" >Total: { formattedTotal }</p>
          <button onClick={ this.start }>Start</button>
          <button onClick={ this.stop }>Stop</button>
        </div>

        <ul>
          { 
            tasks.map(function(task) {
              return <li key={ task.id }>
                       <ul id="task_holder">
                         <li>{ task.title }</li>
                         <li>{ task.desc }</li>
                         <li>{ task.time }</li>
                       </ul>
                     </li>; 
            })
          }
        </ul>
      </div>
    );
  },
  reset: function() {
    console.log('reset');
  },
  _onChange: function() {
    var state = this._getState();
    
    this.setState({
      tasks: state.tasks,
      total: state.total
    });
  },
  _getState: function() {
    var tasks = getTaskState();
    var total = getTotalTime(tasks);
    return {
      tasks: tasks,
      total: total
    };
  }
  
});

module.exports = CountDown;