var mongoose = require('mongoose');

var task = new mongoose.Schema({
  id: String,
  title: String,
  time: Number,
  desc: String
});

module.exports = mongoose.model('Task', task);