/** @jsx React.DOM */
var React = require('react');
var AppAPI = require('./api/AppAPI');
var TaskActions = require('./actions/TaskActions');

var Site = require('./components/Site');
var CountDown = require('./components/CountDown');

var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;
var Link = Router.Link;

var routes = (
  <Route name="home" path="/" handler={ Site }>
    <Route name="play" path="play/:id" handler={ CountDown } />
  </Route>
);

AppAPI.init().then(function(projects) {
  TaskActions.receiveProjects(projects);
  Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('site'));
  });
},
function(err) {
  console.log('You fucked up');
});