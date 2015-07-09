const Marty = require('marty');
const TaskConstants = require('../constants/TaskConstants');
import _ from 'lodash';

class TaskQueries extends Marty.Queries {
  getProjects() {
    const options = {
      id: _.uniqueId(),
      method: 'GET',
      url: 'http://localhost:3000/api/projects'
    };

    return this.app.AppAPI.requester(options).then((res) => {
      const response = res[0];
      this.dispatch(TaskConstants.RECEIVE_PROJECTS, response.body);
    }, (err) => {
      console.log(arguments)
    }).catch((e) => {
      console.log(e, 'Task Queries')
    });
  }
}

export default TaskQueries;
