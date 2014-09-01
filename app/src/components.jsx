/** @jsx React.DOM */

var React = require('react');
var EventEmitter = require('events').EventEmitter;

var CountDown = React.createClass({
  getInitialState: function() {
    return { total: this.props.total };
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
        <h1>Timer Queue</h1>
        <p ref="total" >Total: { this.state.total }</p>
        <button onClick={ this.start }>Start</button>
        <button onClick={ this.stop }>Stop</button>
      </div>
    );
  }
});

var Dummy = React.createClass({
  getInitialState: function() {
    return { status: 12 };
  },
  render: function() {
    return ( 
      <p>yo { this.state.status }</p>
    );
  }
});
