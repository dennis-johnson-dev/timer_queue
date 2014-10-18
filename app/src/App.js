/** @jsx React.DOM */
var React = require('react');
var CountDown = require('./CountDown');

function renderApp(project) {
  React.renderComponent(
    CountDown({project: project}),
    document.getElementById('content')
  );
}

window.renderApp = renderApp;
