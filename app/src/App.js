/** @jsx React.DOM */
var React = require('react');
var CountDown = require('./CountDown');

function renderApp(data) {
  React.renderComponent(
    CountDown({data: data}),
    document.getElementById('content')
  );
}

window.renderApp = renderApp;
