/** @jsx React.DOM */
var React = require('react');
var Project = require('./Project');

var renderProject = function (project) {
    React.renderComponent(
      <Project project={ project }/>,
      document.getElementById('content')
    );
}

window.renderProject = renderProject;
