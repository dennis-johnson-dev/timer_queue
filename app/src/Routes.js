import React from 'react';
import { Route, DefaultRoute } from 'react-router';
import SiteContainer from './components/SiteContainer';
import CountDownContainer from './components/CountDownContainer';
import ProjectContainer from './components/ProjectContainer';
import CreateProject from './components/CreateProject';
import EditProject from './components/EditProject';
import Html from './components/Html';

module.exports = [
  <Route name="home" path="/" handler={ SiteContainer }>
    <DefaultRoute handler={ ProjectContainer }/>
    <Route name="play" path="play/:id" handler={ CountDownContainer } />
    <Route name="edit" path="edit/:id" handler={ EditProject } />
    <Route name="create" path="create" handler={ CreateProject } />
  </Route>
];
