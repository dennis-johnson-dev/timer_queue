import React from 'react';
import { Route } from 'react-router';
import SiteContainer from './components/SiteContainer';
import CountDownContainer from './components/CountDownContainer';
import ProjectContainer from './components/ProjectContainer';
import CreateProject from './components/CreateProject';
import EditProject from './components/EditProject';
import Html from './components/Html';


module.exports = (
  <Route component={ SiteContainer } >
    <Route path="/" component={ ProjectContainer }/>
    <Route path="/play/:id" component={ CountDownContainer } />
    <Route path="/edit/:id" component={ EditProject } />
    <Route path="/create" component={ CreateProject } />
  </Route>
);
