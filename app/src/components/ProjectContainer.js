const Marty = require('marty');
const ProjectList = require('./ProjectList');

module.exports = Marty.createContainer(ProjectList, {
  listenTo: [ 'TaskStore' ],
  fetch: {
    projects() {
      return this.app.TaskStore.getProjects();
    }
  },
  pending(results) {
    return this.done(results);
  }
});
