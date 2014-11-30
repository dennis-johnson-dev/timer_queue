/** @jsx React.DOM */
var React = require('react');
var AppAPI = require('./api/AppAPI');
var TaskServerActions = require('./actions/TaskServerActions');

var Site = require('./components/Site');
var CountDown = require('./components/CountDown');
var ProjectList = require('./components/ProjectList');
var CreateProject = require('./components/CreateProject');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Routes = Router.Routes;
var Route = Router.Route;
var Link = Router.Link;

var routes = (
  <Route name="home" path="/" handler={ Site }>
    <DefaultRoute handler={ ProjectList }/>
    <Route name="play" path="play/:id" handler={ CountDown } />
    <Route name="create" path="create" handler={ CreateProject } />
  </Route>
);

AppAPI.init().then(function(projects) {
  TaskServerActions.receiveProjects(projects);
  Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('site'));
  });
},
function(err) {
  console.log('You fucked up');
});