/** @jsx React.DOM */
var React = require('react');
var TaskStore = require('./store/TaskStore');
var TaskActions = require('./actions/TaskActions');

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
    var tasks = getTaskState();
    var total = getTotalTime(tasks);
    return {
      test: [],
      tasks: getTaskState(),
      total: total
    };
  },
  componentDidMount: function() {
    $.get('/api/tasks', function(result) {
      if (this.isMounted()) {
        this.setState({ test: result }); 
      }
    }.bind(this));

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
    var tasks = this.state.tasks;

    return (
      <div>
        <div>
          <p ref="total" >Total: { this.state.total }</p>
          <button onClick={ this.start }>Start</button>
          <button onClick={ this.stop }>Stop</button>
          { this.state.test }
        </div>

        <ul>
          { 
            tasks.map(function(task) {
              return <li key={ task.id }>
                       <ul>
                         <li>{ task.title }</li>
                         <li>{ task.time }</li>
                       </ul>
                     </li>; 
            })
          }
        </ul>
      </div>
    );
  },
  _onChange: function() {
    console.log('changed');
  }
  
});

module.exports = CountDown;
