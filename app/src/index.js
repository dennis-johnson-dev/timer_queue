require('../css/style.scss');
import Application from './Application';
import { ApplicationContainer } from 'marty';
import enableFastClick from './lib/enableFastClick';

import React from 'react';
import Router from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import routes from './Routes';

window.React = React;

const app = new Application();
app.rehydrate();

enableFastClick();

let rootInstance = null;

rootInstance = React.render((
  <ApplicationContainer app={ app }>
    <Router history={ history } children={ routes }/>
  </ApplicationContainer>
), document.getElementById('site'));

if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function () {
      // Help React Hot Loader figure out the root component instances on the page:
      return [rootInstance];
    }
  });
}
