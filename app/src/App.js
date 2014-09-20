/** @jsx React.DOM */
var React = require('react');
var CountDown = require('./CountDown');

React.renderComponent(
  <CountDown />,
  document.getElementById('content')
);

