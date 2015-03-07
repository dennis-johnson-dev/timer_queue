/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var TaskStore = require('../stores/TaskStore');
var CountDown = require('./CountDown');
var formatTime = require('../lib/formatTime');
var Router = require('react-router');
var Marty = require('marty');
var Immutable = require('immutable');

var ENTER_KEY_CODE = 13;

var ProjectState = Marty.createStateMixin({
  listenTo: [ TaskStore ],
  getState: function () {
    return {
      play: true,
      project: Immutable.Map(_.cloneDeep(TaskStore.getProject(this.getParams().id)))
    };
  }
});

var CountDownContainer = React.createClass({
  displayName: 'CountDownContainer',

  mixins: [ Router.State, ProjectState ],

  render: function() {

    return (
      <CountDown tasks={ this.state.project.get('tasks') } title={ this.state.project.get('title') } reset={ this.reset } /> 
    );
  },

  reset: function() {
    this.setState(
      { 
        project: Immutable.Map(_.cloneDeep(TaskStore.getProject(this.getParams().id)))
      }
    );
  }
  
});

module.exports = CountDownContainer;
