/** @jsx React.DOM */
var React = require('react');
var TaskStore = require('../store/TaskStore');
var TaskList = require('./TaskList');
var TaskActions = require('../actions/TaskActions');

var Project = React.createClass({
  displayName: 'Project',

  getInitialState: function() {
    return {
      project: TaskStore.getProject(this.props.params.id)
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ project: TaskStore.getProject(nextProps.params.id) });
  },
  
  render: function() {
    return (
      <div>
        <h3>{ this.state.project.title }</h3>
        <ul>
          {
            this.state.project.tasks.map(function(task) {
              return <li key={ task._id }>
                <ul>
                  <li>{ task.title }</li>
                  <li>{ task.desc }</li>
                  <li>{ task.time }</li>
                </ul>
              </li>
            })
          }
        </ul>
      </div>
    );
  }
});

var ENTER_KEY_CODE = 13;

module.exports = Project;