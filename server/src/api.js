const _ = require('lodash');
const Express = require('express');
const router = Express.Router();
const Project = require('../models/Project');
const Task = require('../models/Task');

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
      res.json(projects).end();
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

export default router;
