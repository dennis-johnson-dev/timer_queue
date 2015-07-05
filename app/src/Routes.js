import React from 'react';
import { Route, DefaultRoute } from 'react-router';
const SiteContainer = require('./components/SiteContainer');
const CountDownContainer = require('./components/CountDownContainer');
const ProjectContainer = require('./components/ProjectContainer');
const CreateProject = require('./components/CreateProject');
const EditProject = require('./components/EditProject');

module.exports = [
  <Route name="home" path="/" handler={ SiteContainer }>
    <DefaultRoute handler={ ProjectContainer }/>
    <Route name="play" path="play/:id" handler={ CountDownContainer } />
    <Route name="edit" path="edit/:id" handler={ EditProject } />
    <Route name="create" path="create" handler={ CreateProject } />
  </Route>
];
