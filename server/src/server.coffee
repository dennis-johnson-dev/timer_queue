express = require 'express'
path = require 'path'
bodyParser = require 'body-parser'

Project = require './Project'

app = express()
port = process.env.PORT || 3000
router = express.Router()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname + '../../../public')))

app.set 'views', path.join(__dirname + '../../../views')
app.set 'view engine', 'jade'

# Routes

# projects = [
#   projectOne =
#     id: 0
#     title: 'One'
#     tasks: [
#       {
#         id: 1,
#         time: 90,
#         title: 'Task 1'
#         desc: 'Begin brewing'
#       },
#       {
#         id: 2,
#         time: 240,
#         title: 'Task 2'
#         desc: 'Stir coffee and continue brewing'
#       }
#     ]
#   projectTwo =
#     id: 1
#     title: 'Two'
#     tasks: [
#       {
#         id: 1,
#         time: 20,
#         title: 'Task 1'
#         desc: 'Begin stewing'
#       },
#       {
#         id: 2,
#         time: 23,
#         title: 'Task 2'
#         desc: 'Stir toffee and continue stewing'
#       }
#     ]
# ]

app.get('/', (req, res) ->
  res.render 'index', { data: projects[0].tasks }
)

app.get('/play/:id', (req, res) ->
  res.render 'play', { project: projects[req.params.id] }
)  

app.get('/project/:id', (req, res) -> 
  res.render 'project', { project: projects[req.params.id] }
)

router.get('/', (req, res) -> 
  res.json({ message: 'Awesome, fuck yeah!' })
)

router.route('/projects')
  .post (req,res) ->
    project = new Project()
    console.log req.body.name
    project.name = req.body.name

    project.save((err) ->
      if err
        res.send err

      res.json({ message: 'Project created!' })
    )

  .get (req, res) ->
    Project.find((err, projects) -> 
      if err
        res.send err

      res.json(projects)
    )

router.route('/projects/:id')
  .get (req, res) ->
    Project.findById(req.params.id, (err, project) ->
      if err
        res.send err

      res.json project
  )

  .put (req, res) ->
    Project.findById(req.params.id, (err, project) ->
      if err
        res.send err

      project.name = req.body.name

      project.save (err) ->
        if err
          res.send err

        res.json({ message: 'Project updated' })
    )

  .delete (req, res) ->
    Project.remove({
      _id: req.params.id
    }, (err) ->
      if err
        res.send err

      res.json({ message: 'Project deleted!' })
    )

app.use('/api', router)

app.listen(port)
console.log 'listening on 3000...'
