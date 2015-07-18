import Marty from 'marty';
import TaskConstants from '../constants/TaskConstants';
import _ from 'lodash';

class TaskQueries extends Marty.Queries {
  getProjects() {
    let hostname;
    if (process.env && process.env.DEV) {
      hostname = 'http://localhost:3000';
    } else {
      hostname = 'http://timerqueue.herokuapp.com';
    }
    const options = {
      id: _.uniqueId(),
      method: 'GET',
      url: `${hostname}/api/projects`
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
