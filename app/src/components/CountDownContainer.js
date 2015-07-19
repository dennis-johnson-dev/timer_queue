const React = require('react/addons');
const _ = require('lodash');
const TaskStore = require('../stores/TaskStore');
const CountDown = require('./CountDown');
const formatTime = require('../lib/formatTime');
const Marty = require('marty');
const Immutable = require('immutable');

const ENTER_KEY_CODE = 13;

module.exports = Marty.createContainer(CountDown, {
  contextTypes: {
    router: React.PropTypes.object
  },
  listenTo: 'TaskStore',
  fetch: {
    project() {
      const id = this.context.router.state.params.id;
      return this.context.app.TaskStore.getProject(id);
    }
  }
});
