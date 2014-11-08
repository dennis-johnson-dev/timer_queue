/** @jsx React.DOM */
var React = require('react');
var AppAPI = require('./api/AppAPI');
var TaskActions = require('./actions/TaskActions');

var Site = require('./components/Site');
var ProjectList = require('./components/ProjectList');
var Project = require('./components/Project');
var CountDown = require('./components/CountDown');

var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;
var Link = Router.Link;

var routes = (
  <Routes>
    <Route name="home" path="/" handler={ Site }>
      <Route name="projects" path="projects" handler={ ProjectList } />
        <Route name="project" path="project/:id" handler={ Project } />
      <Route name="play" path="play/:id" handler={ CountDown } />
    </Route>
  </Routes>
);

AppAPI.init().then(function(projects) {
  TaskActions.receiveProjects(projects);
  React.renderComponent(routes, document.getElementById('site'));
});