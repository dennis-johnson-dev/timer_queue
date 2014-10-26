/** @jsx React.DOM */
var React = require('react');
var TaskStore = require('../store/TaskStore');
var Router = require('react-router');
var Link = Router.Link;

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
    var project = this.state.project;
    return (
      <div>
        <h3>{ project.title }</h3>
        <ul>
          {
            this.state.project.tasks.map(function(task) {
              return <li key={ task._id }>
                <ul>
                  <li>{ task.title }</li>
                  <li>{ task.desc }</li>
                  <li>{ task.time }</li>
                </ul>
                <Link to="play" params={{ id: project._id }}>Start</Link>
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