const Marty = require('marty');
const TaskConstants = require('../constants/TaskConstants');
import _ from 'lodash';

class TaskQueries extends Marty.Queries {
  getProjects() {
    const options = {
      id: _.uniqueId(),
      method: 'GET',
      url: '/api/projects'
    };

    return this.app.AppAPI.requester(options).then((res) => {
      this.dispatch(TaskConstants.RECEIVE_PROJECTS, res.body);
    }).catch((e) => {
      console.log(e)
    });
  }
}

export default TaskQueries;
