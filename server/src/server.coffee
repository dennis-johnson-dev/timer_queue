_ = require 'lodash'
bodyParser = require 'body-parser'
express = require 'express'
favicon = require 'serve-favicon'
http = require 'http'
mongoose = require 'mongoose'
path = require 'path'
compression = require('compression')
_ = require('lodash')

setInterval(() ->
  http.get('http://timerqueue.herokuapp.com')
, 30000)

# models
Project = require '../models/Project'
Task = require '../models/Task'

app = express()
port = process.env.PORT || 3000
router = express.Router()

log = (req, res, next) ->
  console.log res.statusCode, req.url, req.method
  next()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname + '../../../public'), { maxAge: 8640000  } ))
app.use(log)
app.use(favicon(path.join(__dirname + '../../../public/favicon.ico')))

app.use(compression())

app.set 'views', path.join(__dirname + '../../../views')
app.set 'view engine', 'jade'

# app routes

app.get('/', (req, res) ->
  res.render 'index'
)

# /api routes

router.route('/projects')
  .post (req,res) ->
    project = new Project()
    project.title = req.body.title
    project.id = req.body.id
    project.tasks = _.map(req.body.tasks, (task) ->
      taskModel = new Task()
      taskModel.id = task.id
      taskModel.time = task.time
      taskModel.title = task.title
      taskModel.desc = task.desc
      return taskModel
    )

    project.save((err) ->
      if err
        res.status(500).send(new Error('Unable to create project'))
        return

      res.json({ message: 'Project created!' })
    )

  .get (req, res) ->
    Project.find((err, projects) ->
      
      if err
        res.status(500).send(new Error('Unable to get projects'))
        return

      res.setHeader('Cache-Control', 'public, max-age=3155')
      res.json(projects)
    )

router.route('/projects/:id')
  .get (req, res) ->
    Project.findOne({ id: req.params.id }, (err, project) ->

      if (_.isNull(project))
        res.status(404).send(new Error('Unable to get project'))
        return

      res.json project
  )

  .put (req, res) ->
    Project.findOne({ id: req.params.id }, (err, project) ->
      if err
        res.send err

      project.title = req.body.title
      project.tasks = _.map(req.body.tasks, (task) ->
        taskModel = new Task()
        taskModel.id = task.id
        taskModel.time = task.time
        taskModel.title = task.title
        taskModel.desc = task.desc
        return taskModel
      )

      project.save (err) ->
        if err
          res.status(500).send(new Error('Unable to update project'))
          return

        res.json({ message: 'Project updated' })
    )

  .delete (req, res) ->
    Project.remove({
      id: req.params.id
    }, (err) ->
      if err
        res.status(500).send(new Error('Unable to delete project'))
        return

      res.json({ message: 'Project deleted!' })
    )

app.use('/api', router)

# db connection

mongoUri = process.env.MONGOLAB_URI
mongoose.connect(mongoUri, (err, res) ->
  if err
    console.log('Error connect to: ' + mongoUri + '. ' + err)
  else
    console.log('Succeeded and connected to: ' + mongoUri)
    app.listen(port)
    console.log 'listening on 3000...'
)

