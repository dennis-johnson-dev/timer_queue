express = require 'express'
path = require 'path'
bodyParser = require 'body-parser'

app = express()
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname + '../../../public')))

# Routes

app.listen(3000)
console.log 'listening on 3000...'
