require('../css/style.scss');
const { ApplicationContainer } = require('marty');
const React = require('react');

const Application = require('./Application');
const app = new Application();

let rootInstance = null;

const Router = require('react-router');
// const router = require('../../app/src/Router')
const DefaultRoute = Router.DefaultRoute;
const Routes = Router.Routes;
const Route = Router.Route;
const Link = Router.Link;
const routes = require('./Routes');

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
