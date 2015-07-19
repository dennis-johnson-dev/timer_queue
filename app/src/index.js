require('../css/style.scss');
import { ApplicationContainer } from 'marty';
import React from 'react';
import enableFastClick from './lib/enableFastClick';

import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/HashHistory';
import routes from './Routes';

import Application from './Application';

window.React = React;
let rootInstance = null;
const app = new Application();
app.rehydrate();
enableFastClick();

rootInstance = React.render((
  <ApplicationContainer app={ app }>
    <Router history={ history }>{ routes }</Router>
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
