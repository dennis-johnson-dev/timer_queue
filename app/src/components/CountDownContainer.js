const React = require('react/addons');
const _ = require('lodash');
const TaskStore = require('../stores/TaskStore');
const CountDown = require('./CountDown');
const formatTime = require('../lib/formatTime');
const Marty = require('marty');
const Immutable = require('immutable');

const ENTER_KEY_CODE = 13;

module.exports = Marty.createContainer(CountDown, {
  listenTo: 'TaskStore',
  fetch: {
    project() {
      return this.context.app.TaskStore.getProject(this.props.params.id);
    }
  }
});
