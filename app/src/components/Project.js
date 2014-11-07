/** @jsx React.DOM */
var React = require('react');
var TaskStore = require('../store/TaskStore');
var Router = require('react-router');
var formatTime = require('../mixins/formatTime');
var Link = Router.Link;

var Project = React.createClass({
  displayName: 'Project',
  mixins: [formatTime],

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
            project.tasks.map(function(task) {
              return <li key={ task._id }>
                <ul>
                  <li>Title: { task.title }</li>
                  <li>Description: { task.desc }</li>
                  <li>Time: { formatTime(task.time) }</li>
                </ul>
               
              </li>
            })
          }
        </ul>
        <Link to="play" params={{ id: project._id }}>Start</Link>
      </div>
    );
  }
});

var ENTER_KEY_CODE = 13;

module.exports = Project;