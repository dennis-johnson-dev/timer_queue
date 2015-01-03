/** @jsx React.DOM */
require('6to5/polyfill');
var React = require('react');
var AppAPI = require('./api/AppAPI');

var Site = require('./components/Site');
var CountDown = require('./components/CountDown');
var ProjectList = require('./components/ProjectList');
var CreateProject = require('./components/CreateProject');
var EditProject = require('./components/EditProject');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Routes = Router.Routes;
var Route = Router.Route;
var Link = Router.Link;

var routes = (
  <Route name="home" path="/" handler={ Site }>
    <DefaultRoute handler={ ProjectList }/>
    <Route name="play" path="play/:id" handler={ CountDown } />
    <Route name="edit" path="edit/:id" handler={ EditProject } />
    <Route name="create" path="create" handler={ CreateProject } />
  </Route>
);

AppAPI.init().then(function() {
  Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('site'));
  });
},
function(err) {
  console.log('You trucked up');
});
