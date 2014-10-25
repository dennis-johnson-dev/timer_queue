mongoose = require('mongoose')

mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/timer_queue'
 
mongoose.connect(mongoUri, (err, res) -> 
  if err
    console.log('Error connect to: ' + mongoUri + '. ' + err)
  else
    console.log('Succeeded and connected to: ' + mongoUri)
)

schema = new mongoose.Schema({
  name: String
})

module.exports = mongoose.model('Project', schema)