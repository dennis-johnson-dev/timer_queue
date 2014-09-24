express = require 'express'
path = require 'path'
bodyParser = require 'body-parser'

app = express()
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname + '../../../public')))

app.set 'views', path.join(__dirname + '../../../views')
app.set 'view engine', 'jade'

# Routes

tasks = [
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

app.get('/', (req, res) ->
  res.render 'index', { data: tasks }
)
  

app.listen(3000)
console.log 'listening on 3000...'
