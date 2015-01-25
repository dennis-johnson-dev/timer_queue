var mongoose = require('mongoose');
var Task = require('./Task').task;

var project = new mongoose.Schema({
  id: String,
  title: String,
  tasks: [Task]
});

module.exports = mongoose.model('Project', project);
