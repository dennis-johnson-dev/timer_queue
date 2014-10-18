express = require 'express'
path = require 'path'
bodyParser = require 'body-parser'

app = express()
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname + '../../../public')))

app.set 'views', path.join(__dirname + '../../../views')
app.set 'view engine', 'jade'

# Routes

projects = [
  projectOne =
    id: 0
    title: 'One'
    tasks: [
      {
        id: 1,
        time: 90,
        title: 'Task 1'
        desc: 'Begin brewing'
      },
      {
        id: 2,
        time: 240,
        title: 'Task 2'
        desc: 'Stir coffee and continue brewing'
      }
    ]
  projectTwo =
    id: 1
    title: 'Two'
    tasks: [
      {
        id: 1,
        time: 20,
        title: 'Task 1'
        desc: 'Begin stewing'
      },
      {
        id: 2,
        time: 23,
        title: 'Task 2'
        desc: 'Stir toffee and continue stewing'
      }
    ]
]

app.get('/', (req, res) ->
  res.render 'index', { data: projects[0].tasks }
)

app.get('/play/:id', (req, res) ->
  res.render 'play', { project: projects[req.params.id] }
)  

app.get('/project/:id', (req, res) -> 
  res.render 'project', { project: projects[req.params.id] }
)

app.get('/api/projects', (req, res) ->
  res.json(projects)
)

app.listen(3000)
console.log 'listening on 3000...'
