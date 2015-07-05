'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _ = require('lodash');
var Express = require('express');
var router = Express.Router();
var Project = require('../models/Project');
var Task = require('../models/Task');

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
    res.json(projects).end();
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

exports['default'] = router;
module.exports = exports['default'];