/** @jsx React.DOM */
var React = require('react');
var CountDown = require('./CountDown');

React.renderComponent(
  <CountDown total="10" />,
  document.getElementById('content')
);

