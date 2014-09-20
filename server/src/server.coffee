express = require 'express'
path = require 'path'
bodyParser = require 'body-parser'

app = express()
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname + '../../../public')))

app.set 'views', path.join(__dirname + '../../../views')
app.set 'view engine', 'jade'

# Routes

app.get('/api/tasks', (req, res) ->
  result = [1, 2, 4]
  res.json result
)

app.get('/', (req, res) ->
  res.render 'index'
)
  

app.listen(3000)
console.log 'listening on 3000...'
