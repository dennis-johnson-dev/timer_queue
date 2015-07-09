'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _marty = require('marty');

var _marty2 = _interopRequireDefault(_marty);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

require('babel/register');

var Application = require('../../app/src/Application');
var Html = require('../../app/src/components/Html');
var routes = require('../../app/src/Routes');

setInterval(function () {
  return _http2['default'].get('http://timerqueue.herokuapp.com');
}, 30000);

var app = (0, _express2['default'])();
var port = process.env.PORT || 3000;

var log = function log(req, res, next) {
  console.log(res.statusCode, req.url, req.method);
  next();
};

app.use(_bodyParser2['default'].urlencoded({ extended: true }));
app.use(_bodyParser2['default'].json());
app.use(_express2['default']['static'](_path2['default'].join(__dirname + '../../../public'), { maxAge: 8640000 }));
app.use(log);
app.use((0, _serveFavicon2['default'])(_path2['default'].join(__dirname + '../../../public/favicon.ico')));

app.use((0, _compression2['default'])());

app.set('views', _path2['default'].join(__dirname + '../../../views'));
app.set('view engine', 'jade');

// /api routes

app.use('/api', _api2['default']);

// app routes

// app.get('/', (req, res) => {
//  res.render('index');
// });

/*
 * USE below for server side rendering
 *
 */
function _trimState(state) {
  return state.slice(state.indexOf('>') + 1, state.indexOf('<', 2));
}

app.use(function (req, res, next) {
  var app = new Application();
  var router = _reactRouter2['default'].create({
    location: req.url,
    routes: routes
  });

  router.run(function (Handler, state) {
    app.renderToStaticMarkup(_react2['default'].createElement(Handler, state.params)).then(function (response) {
      var htmlState = _trimState(response.htmlState);
      var html = _react2['default'].renderToStaticMarkup(_react2['default'].createElement(Html, { markup: response.htmlBody, storeState: htmlState }));
      // console.log('rendering on the server', response.diagnostics)
      res.send('<!DOCTYPE>' + html);
    })['catch'](function (e) {
      console.log(e);
    });
  }, function (err) {
    console.log(err);
  });
});

// db connection

var mongoUri = process.env.MONGOLAB_URI;
_mongoose2['default'].connect(mongoUri, function (err, res) {
  if (err) {
    console.log('Error connect to: ' + mongoUri + '. ' + err);
  } else {
    console.log('Succeeded and connected to: ' + mongoUri);
    app.listen(port);
    console.log('listening on 3000...');
  }
});