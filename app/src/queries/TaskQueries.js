var Marty = require('marty');
var format = require('util').format;
var AppAPI = require('../api/AppAPI');
var TaskConstants = require('../constants/TaskConstants');

class TaskQueries extends Marty.Queries {
  getProjects() {
    return AppAPI.for(this).getProjects().then(res => {
      return this.dispatch(TaskConstants.RECEIVE_PROJECTS, res.body);
    });
  }
}

module.exports = Marty.register(TaskQueries);