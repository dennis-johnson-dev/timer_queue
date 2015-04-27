const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const favicon = require('serve-favicon');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const compression = require('compression');
require('babel/register');
const React = require('react');
const Router = require('react-router');
const routes = require('../../app/src/Routes');
const Marty = require('marty');
let Html = require('../../app/src/components/Html');


setInterval(() =>
  http.get('http://timerqueue.herokuapp.com')
, 30000);

// models
const Project = require('../models/Project');
const Task = require('../models/Task');

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

let log = (req, res, next) => {
  console.log(res.statusCode, req.url, req.method);
  next();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '../../../public'), { maxAge: 8640000  } ));
app.use(log);
app.use(favicon(path.join(__dirname + '../../../public/favicon.ico')));

app.use(compression());

app.set('views', path.join(__dirname + '../../../views'));
app.set('view engine', 'jade');

// /api routes

router.route('/projects')
  .post((req,res) => {
    let project = new Project();
    let taskModel;
    project.title = req.body.title;
    project.id = req.body.id;
    project.tasks = _.map(req.body.tasks, (task) => {
      taskModel = new Task();
      taskModel.id = task.id;
      taskModel.time = task.time;
      taskModel.title = task.title;
      taskModel.desc = task.desc;
      return taskModel;
    });

    project.save((err) => {
      if (err) {
        res.status(500).send(new Error('Unable to create project'));
        return
      }

      res.json({ message: 'Project created!' });
    });
  })

  .get((req, res) => {
    Project.find((err, projects) => {
      if (err) {
        res.status(500).send(new Error('Unable to get projects'));
        return;
      }

      res.setHeader('Cache-Control', 'public, max-age=3155');
      res.json(projects);
    });
  });

router.route('/projects/:id')
  .get((req, res) => {
    Project.findOne({ id: req.params.id }, (err, project) => {
      if (_.isNull(project)) {
        res.status(404).send(new Error('Unable to get project'));
        return;
      }

      res.json(project);
    });
  })

  .put((req, res) => {
    Project.findOne({ id: req.params.id }, (err, project) => {
      if (err) {
        res.send(err);
      }

      project.title = req.body.title;
      project.tasks = _.map(req.body.tasks, (task) => {
        let taskModel = new Task()
        taskModel.id = task.id
        taskModel.time = task.time
        taskModel.title = task.title
        taskModel.desc = task.desc
        return taskModel
      });

      project.save((err) => {
        if (err) {
          res.status(500).send(new Error('Unable to update project'));
          return;
        }

        res.json({ message: 'Project updated' });
      });
    })
  })

  .delete((req, res) => {
    Project.remove({ id: req.params.id }, function(err) {
      if (err) {
        res.status(500).send(new Error('Unable to delete project'));
        return;
      }

      res.json({ message: 'Project deleted!' });
    });
  });

app.use('/api', router);

// app routes

app.get('/', (req, res) => {
 res.render('index');
});

/*app.use(require('marty-express')({
  routes: require('../../app/src/Routes')
}));*/

/*app.use((req, res, next) => {
  let router = Router.create({
    location: req.url,
    routes: routes
  });

  router.run(function(Handler, state) {
    let context = Marty.createContext();
    context.req = req;
    context.res = res;

    const renderOptions = {
      type: Handler,
      context: context,
      props: state.params,
      timeout: 10000
    };

    Marty.renderToString(renderOptions).then(function(result) {
      let html;
      console.log(result.diagnostics);

      try {
        html = React.renderToStaticMarkup(<Html markup={ result.html } />);
      } catch (e) {
       console.log(e);
      }
      console.log('sent from server')
      res.send('<!DOCTYPE>' + html);
    }, function(err) {
      console.log(err);
    });
  });
});*/

// db connection

const mongoUri = process.env.MONGOLAB_URI;
mongoose.connect(mongoUri, (err, res) => {
  if (err) {
    console.log('Error connect to: ' + mongoUri + '. ' + err);
  } else {
    console.log('Succeeded and connected to: ' + mongoUri);
    app.listen(port)
    console.log('listening on 3000...');
  }
});
