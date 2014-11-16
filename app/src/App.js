/** @jsx React.DOM */
var React = require('react');
var AppAPI = require('./api/AppAPI');
var TaskActions = require('./actions/TaskActions');

var Site = require('./components/Site');

AppAPI.init().then(function(projects) {
  TaskActions.receiveProjects(projects);
  React.render(<Site />, document.getElementById('site'));
},
function(err) {
  console.log('You fucked up');
});