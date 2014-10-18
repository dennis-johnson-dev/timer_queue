/** @jsx React.DOM */
var React = require('react');
var ProjectList = require('./ProjectList');
var AppAPI = require('./AppAPI');
var TaskActions = require('./actions/TaskActions');

function renderProjects() {
	AppAPI.init().then(function(projects) {
    TaskActions.receiveProjects(projects);

    React.renderComponent(
      ProjectList(),
      document.getElementById('content')
    );
  });

}

window.renderProjects = renderProjects;
