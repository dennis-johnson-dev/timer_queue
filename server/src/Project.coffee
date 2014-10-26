mongoose = require('mongoose')
Task = require('./Task').task

mongoUri = 'mongodb://localhost/timer_queue'
 
mongoose.connect(mongoUri, (err, res) ->
  if err
    console.log('Error connect to: ' + mongoUri + '. ' + err)
  else
    console.log('Succeeded and connected to: ' + mongoUri)
)

project = new mongoose.Schema({
  title: String
  tasks: [Task]
})

module.exports = mongoose.model('Project', project)
