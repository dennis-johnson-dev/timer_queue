/** @jsx React.DOM */
var React = require('react');
var AppAPI = require('./api/AppAPI');

var Site = require('./components/Site');
var CountDownContainer = require('./components/CountDownContainer');
var ProjectList = require('./components/ProjectList');
var CreateProject = require('./components/CreateProject');
var EditProject = require('./components/EditProject');

var rootInstance = null;

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Routes = Router.Routes;
var Route = Router.Route;
var Link = Router.Link;

var routes = [
  <Route name="home" path="/" handler={ Site }>
    <DefaultRoute handler={ ProjectList }/>
    <Route name="play" path="play/:id" handler={ CountDownContainer } />
    <Route name="edit" path="edit/:id" handler={ EditProject } />
    <Route name="create" path="create" handler={ CreateProject } />
  </Route>
];

AppAPI.init().then(function() {
  Router.run(routes, function(Handler) {
    rootInstance = React.render(<Handler/>, document.getElementById('site'));
  });
},
function(err) {
  console.log('You trucked up');
});

if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function () {
      // Help React Hot Loader figure out the root component instances on the page:
      return [rootInstance];
    }
  });
}
