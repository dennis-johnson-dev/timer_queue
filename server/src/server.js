require('babel/register');
import _ from 'lodash';
import BodyParser from 'body-parser';
import Compression from 'compression';
import Express from 'express';
import Favicon from 'serve-favicon';
import Http from 'http';
import Marty from 'marty';
import Mongoose from 'mongoose';
import React from 'react';
import ReactRouter from 'react-router';
import Path from 'path';

import api from './api';
const Application = require('../../app/src/Application');
const Html = require('../../app/src/components/Html');
const routes = require('../../app/src/Routes');

setInterval(() =>
  Http.get('http://timerqueue.herokuapp.com')
, 30000);

const app = Express();
const port = process.env.PORT || 3000;

let log = (req, res, next) => {
  console.log(res.statusCode, req.url, req.method);
  next();
};

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(Express.static(Path.join(__dirname + '../../../public'), { maxAge: 8640000  } ));
app.use(log);
app.use(Favicon(Path.join(__dirname + '../../../public/favicon.ico')));

app.use(Compression());

app.set('views', Path.join(__dirname + '../../../views'));
app.set('view engine', 'jade');

// /api routes

app.use('/api', api);

// app routes

app.get('/', (req, res) => {
 res.render('index');
});

/*
 * USE below for server side rendering
 *
 */
// function _trimState(state) {
//   return state.slice((state.indexOf('>') + 1), (state.indexOf('<', 2)));
// }
//
// app.use((req, res, next) => {
//   const app = new Application();
//   let router = ReactRouter.create({
//     location: req.url,
//     routes
//   });
//
//   router.run((Handler, state) => {
//     app.renderToStaticMarkup(<Handler {...state.params} />).then((response) => {
//       const trimmedHtmlState = _trimState(response.htmlState);
//       const html = React.renderToStaticMarkup(<Html markup={ response.htmlBody } storeState={ trimmedHtmlState }/>);
//       // console.log('rendering on the server', response.diagnostics)
//       res.send(`<!DOCTYPE>${html}`);
//     }).catch((e) => {
//       console.log(e);
//     });
//   }, (err) => {
//     console.log(err);
//   });
// });

// db connection

const mongoUri = process.env.MONGOLAB_URI;
Mongoose.connect(mongoUri, (err, res) => {
  if (err) {
    console.log('Error connect to: ' + mongoUri + '. ' + err);
  } else {
    console.log('Succeeded and connected to: ' + mongoUri);
    app.listen(port)
    console.log('listening on 3000...');
  }
});
