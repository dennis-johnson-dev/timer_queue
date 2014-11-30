express = require 'express'
path = require 'path'
bodyParser = require 'body-parser'
favicon = require 'serve-favicon'
_ = require 'lodash'

# models
Project = require './Project'
Task = require './Task'

app = express()
port = process.env.PORT || 3000
router = express.Router()

log = (req, res, next) ->
  console.log res.statusCode, req.url, req.method
  next()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname + '../../../public')))
app.use(log)
app.use(favicon(path.join(__dirname + '../../../public/favicon.ico')))

app.set 'views', path.join(__dirname + '../../../views')
app.set 'view engine', 'jade'

# app routes

app.get('/', (req, res) ->
  res.render 'index'
)

# /api routes

router.get('/', (req, res) ->
  res.json({ message: 'Awesome, fuck yeah!' })
)

router.route('/projects')
  .post (req,res) ->
    project = new Project()
    project.title = req.body.title
    project.tasks = _.map(req.body.tasks, (task) ->
      taskModel = new Task()
      taskModel.time = task.time
      taskModel.title = task.title
      taskModel.desc = task.desc
      return taskModel
    )

    project.save((err) ->
      if err
        res.send err
        return

      res.json({ message: 'Project created!' })
    )

  .get (req, res) ->
    Project.find((err, projects) -> 
      if err
        res.send err
        return

      res.json(projects)
    )

router.route('/projects/:id')
  .get (req, res) ->
    Project.findById(req.params.id, (err, project) ->
      if err
        res.send err
        return

      res.json project
  )

  .put (req, res) ->
    Project.findById(req.params.id, (err, project) ->
      if err
        res.send err

      project.title = req.body.title
      project.tasks = req.body.tasks

      project.save (err) ->
        if err
          res.send err
          return

        res.json({ message: 'Project updated' })
    )

  .delete (req, res) ->
    Project.remove({
      _id: req.params.id
    }, (err) ->
      if err
        res.send err
        return

      res.json({ message: 'Project deleted!' })
    )

app.use('/api', router)

app.listen(port)
console.log 'listening on 3000...'
