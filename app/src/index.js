require('../css/style.scss');
import Application from './Application';
import { ApplicationContainer } from 'marty';
import enableFastClick from './lib/enableFastClick';

import React from 'react';
import Router from 'react-router';
// import BrowserHistory from 'react-router/lib/BrowserHistory';
import routes from './Routes';

window.React = React;

const app = new Application();
app.rehydrate();

enableFastClick();

let rootInstance = null;

// const history = new BrowserHistory();

// if (typeof history.setup === "function") {
//     history.setup();
// }

Router.run(routes, history.location, (err, initialState, transition) => {
  rootInstance = React.render((
    <ApplicationContainer app={ app }>
      <Router history={ history } routes={ routes } />
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
