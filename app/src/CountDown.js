/** @jsx React.DOM */
var React = require('react');
var TaskStore = require('./store/TaskStore');
var TaskActions = require('./actions/TaskActions');

var ENTER_KEY_CODE = 13;

function getTaskState() {
  return {
    allTasks: TaskStore.getAll()
  };
}

var CountDown = React.createClass({
  displayName: 'CountDown',
  getInitialState: function() {
    return { 
      juice: 'true',
      tasks: getTaskState(),
      total: parseInt(this.props.total),
      value: ''
    };
  },
  componentDidMount: function() {
    TaskStore.addChangeListener(this._onChange); 
  },
  start: function() {
    if (!this.current) {
      this.current = setInterval(this.decrement, 1000); 
    }
    console.log('start');
  },
  stop: function() {
    clearInterval(this.current);
    console.log('stop');
    this.current = null;
  },
  decrement: function() {
    if ((this.state.total - 1) >= 0) {
      this.setState({ total: this.state.total - 1 }); 
    } else {
      this.stop(); 
    }
  },
  render: function() {
    return (
      <div>
        <p ref="total" >Total: { this.state.total }</p>
        <button onClick={ this.start }>Start</button>
        <button onClick={ this.stop }>Stop</button>
        <input 
          type="text" 
          value={ this.state.value }
          onChange={ this._updateTotal } 
          onKeyDown={ this._onKeyDown } 
        />   
        <button onClick={ this._create }>Create</button>
        <div>
          { this.state.tasks }
        </div>
      </div>
    );
  },
  _updateTotal: function() {
    this.setState({
      value: event.target.value
    });
    
  },
  _create: function() {
    var value = parseInt(this.state.value);
    if (value > 0) {
      TaskActions.create(); 
      this.setState({
        total: this.state.total + value
      });
      this.setState({
        value: ''
      });
    }
  },
  _onChange: function() {
    this.setState({
      tasks: getTaskState()
    });
  },
  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._create();
    }
  }
});

module.exports = CountDown;

