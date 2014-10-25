mongoose = require('mongoose')

task = new mongoose.Schema({
  title: String
  time: Number
  desc: String
})

module.exports = mongoose.model('Task', task)