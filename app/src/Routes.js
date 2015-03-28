var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var Site = require('./components/Site');
var ProjectList = require('./components/ProjectList');
var EditProject = require('./components/EditProject');
var CreateProject = require('./components/CreateProject');
var CountDownContainer = require('./components/CountDownContainer');

module.exports = [
  <Route name="home" path="/" handler={ Site }>
    <DefaultRoute handler={ ProjectList }/>
    <Route name="play" path="play/:id" handler={ CountDownContainer } />
    <Route name="edit" path="edit/:id" handler={ EditProject } />
    <Route name="create" path="create" handler={ CreateProject } />
  </Route>
];