'use strict';

var _ = require('lodash');
var bodyParser = require('body-parser');
var express = require('express');
var favicon = require('serve-favicon');
var http = require('http');
var mongoose = require('mongoose');
var path = require('path');
var compression = require('compression');
require('babel/register');
var React = require('react');
var Router = require('react-router');
var routes = require('../../app/src/Routes');
var Marty = require('marty');
var Html = require('../../app/src/components/Html');

setInterval(function () {
  return http.get('http://timerqueue.herokuapp.com');
}, 30000);

// models
var Project = require('../models/Project');
var Task = require('../models/Task');

var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();

var log = function log(req, res, next) {
  console.log(res.statusCode, req.url, req.method);
  next();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express['static'](path.join(__dirname + '../../../public'), { maxAge: 8640000 }));
app.use(log);
app.use(favicon(path.join(__dirname + '../../../public/favicon.ico')));

app.use(compression());

app.set('views', path.join(__dirname + '../../../views'));
app.set('view engine', 'ejs');

// /api routes

router.route('/projects').post(function (req, res) {
  var project = new Project();
  var taskModel = undefined;
  project.title = req.body.title;
  project.id = req.body.id;
  project.tasks = _.map(req.body.tasks, function (task) {
    taskModel = new Task();
    taskModel.id = task.id;
    taskModel.time = task.time;
    taskModel.title = task.title;
    taskModel.desc = task.desc;
    return taskModel;
  });

  project.save(function (err) {
    if (err) {
      res.status(500).send(new Error('Unable to create project'));
      return;
    }

    res.json({ message: 'Project created!' });
  });
}).get(function (req, res) {
  Project.find(function (err, projects) {
    if (err) {
      res.status(500).send(new Error('Unable to get projects'));
      return;
    }

    res.setHeader('Cache-Control', 'public, max-age=3155');
    res.json(projects);
  });
});

router.route('/projects/:id').get(function (req, res) {
  Project.findOne({ id: req.params.id }, function (err, project) {
    if (_.isNull(project)) {
      res.status(404).send(new Error('Unable to get project'));
      return;
    }

    res.json(project);
  });
}).put(function (req, res) {
  Project.findOne({ id: req.params.id }, function (err, project) {
    if (err) {
      res.send(err);
    }

    project.title = req.body.title;
    project.tasks = _.map(req.body.tasks, function (task) {
      var taskModel = new Task();
      taskModel.id = task.id;
      taskModel.time = task.time;
      taskModel.title = task.title;
      taskModel.desc = task.desc;
      return taskModel;
    });

    project.save(function (err) {
      if (err) {
        res.status(500).send(new Error('Unable to update project'));
        return;
      }

      res.json({ message: 'Project updated' });
    });
  });
})['delete'](function (req, res) {
  Project.remove({ id: req.params.id }, function (err) {
    if (err) {
      res.status(500).send(new Error('Unable to delete project'));
      return;
    }

    res.json({ message: 'Project deleted!' });
  });
});

app.use('/api', router);

// app routes

// app.get('/', (req, res) => {
//   res.render('index');
// });

// app.use(require('marty-express')({
//   routes: require('../../app/src/Routes')
// }));

app.use(function (req, res, next) {
  Router.run(routes, req.url, function (Handler, state) {
    var context = Marty.createContext();
    context.req = req;
    context.res = res;

    var renderOptions = {
      type: Handler,
      context: context,
      props: state.params
    };

    var markup = Marty.renderToString(renderOptions).then(function (result) {
      var html = undefined;
      try {
        html = React.renderToStaticMarkup(React.createElement(Html, { markup: result.html }));
      } catch (e) {}
      res.send('<!DOCTYPE>' + html);
    });
  });
});
// ({
//   routes: require('../../app/src/Routes')
// }));

// db connection

var mongoUri = process.env.MONGOLAB_URI;
mongoose.connect(mongoUri, function (err, res) {
  if (err) {
    console.log('Error connect to: ' + mongoUri + '. ' + err);
  } else {
    console.log('Succeeded and connected to: ' + mongoUri);
    app.listen(port);
    console.log('listening on 3000...');
  }
});