/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var TaskViewActions = require('../actions/TaskViewActions');
var TaskList = require('./TaskList');
var formatTime = require('../lib/formatTime');
var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;
var md5 = require('MD5');

var CreateProject = React.createClass({
  displayName: 'CreateProject',

  mixins: [Navigation],

  getTaskModel: function() {
    return {
      title: '',
      time: 0,
      desc: ''
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var now = new Date();
    var project = {
      id: md5(Object.keys(this.state.tasks).toString() + now),
      title: this.refs.projectTitle.getDOMNode().value,
      tasks: this.state.tasks
    };

    TaskViewActions.createProject(project);
    this.transitionTo('home');
  },

  getInitialState: function() {
    var defaultTask = this.getTaskModel();
    return {
      tasks: [defaultTask]
    };
  },

  render: function() {
    var me = this;
    return (
      <div className="createProject container">
        <h3>New Project</h3>
        <form action="http://localhost:3000/" className="projectForm form-horizontal" onSubmit={ this.handleSubmit }>
          <div className="createProjectHeader form-group">
            <div className="form-group text-left">
              <label className="col-sm-2 control-label">Project Title: </label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="projectTitle" placeholder="Project Title" ref="projectTitle" />
              </div>
            </div> 
          </div>
          <div className="form-group">
            <TaskList tasks={ this.state.tasks } onTaskChange={ this.handleTaskChange }/>
          </div>
          <div className="form-group">
            <button onClick={ me.onAddTask } className="add-task-btn btn btn-default btn-block">Add Task</button>
            <input className="project-submit-btn btn btn-default btn-block" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  },

  handleTaskChange: function(task, index) {
    var tasks = this.state.tasks;
    tasks[index] = task;
    this.setState({ tasks: tasks });
  },

  onAddTask: function(e) {
    e.preventDefault();

    var taskModel = this.getTaskModel();
    var tasks = this.state.tasks;

    tasks.push(taskModel);
    this.setState({ tasks: tasks });
  }

});

module.exports = CreateProject;
