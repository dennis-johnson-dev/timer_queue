var Marty = require('marty');
var format = require('util').format;
var AppAPI = require('../api/AppAPI');
var TaskConstants = require('../constants/TaskConstants');
var request = require('superagent');

class TaskQueries extends Marty.Queries {
  constructor(options) {
    super(options);
    this.id = 'TaskQueries';
  }
  getProjects() {
    return AppAPI.for(this).getProjects().then(res => {
      console.log('got projs')
      this.dispatch(TaskConstants.RECEIVE_PROJECTS, res.body);
    }, rej => {
      console.log(rej, 'hihi')
    });
  }
  getProject(id) {
    return AppAPI.for(this).getProject(id).then(res => {
      this.dispatch(TaskConstants.RECEIVE_PROJECT, res.body);
    });
  }
}

module.exports = Marty.register(TaskQueries);
