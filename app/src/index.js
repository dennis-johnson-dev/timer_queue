require('../css/style.scss');
const { ApplicationContainer } = require('marty');
const React = require('react');

const Application = require('./Application');
const app = new Application();

const SiteContainer = require('./components/SiteContainer');
const CountDownContainer = require('./components/CountDownContainer');
const ProjectContainer = require('./components/ProjectContainer');
const CreateProject = require('./components/CreateProject');
const EditProject = require('./components/EditProject');

let rootInstance = null;

const Router = require('react-router');
const DefaultRoute = Router.DefaultRoute;
const Routes = Router.Routes;
const Route = Router.Route;
const Link = Router.Link;

const routes = [
  <Route name="home" path="/" handler={ SiteContainer }>
    <DefaultRoute handler={ ProjectContainer }/>
    <Route name="play" path="play/:id" handler={ CountDownContainer } />
    <Route name="edit" path="edit/:id" handler={ EditProject } />
    <Route name="create" path="create" handler={ CreateProject } />
  </Route>
];

Router.run(routes, function(Handler, state) {
  rootInstance = React.render((
      <ApplicationContainer app={ app }>
        <Handler { ...state.params } />
      </ApplicationContainer>
    ), document.getElementById('site'));
});

if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function () {
      // Help React Hot Loader figure out the root component instances on the page:
      return [rootInstance];
    }
  });
}
