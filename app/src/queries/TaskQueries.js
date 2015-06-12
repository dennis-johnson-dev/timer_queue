const Marty = require('marty');
const TaskConstants = require('../constants/TaskConstants');

class TaskQueries extends Marty.Queries {
  getProjects() {
    const options = {
      url: '/api/projects',
      method: 'GET'
    };

    return this.app.AppAPI.requester(options).then((res) => {
      this.dispatch(TaskConstants.RECEIVE_PROJECTS, res);
    }).catch((e) => {
      console.log(e);
    });
  }
}

export default TaskQueries;
