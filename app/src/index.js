require('../css/style.scss');
const { ApplicationContainer } = require('marty');
const React = require('react');
window.React = React;
const enableFastClick = require('./lib/enableFastClick');

const Application = require('./Application');
const app = new Application();

let rootInstance = null;

import Router, { DefaultRoute, Route } from 'react-router';
// import Router from './Router';
import routes from './Routes';

enableFastClick();
app.rehydrate();
Router.run(routes, (Handler, state) => {
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
