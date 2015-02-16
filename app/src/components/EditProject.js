/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var TaskViewActions = require('../actions/TaskViewActions');
var TaskStore = require('../store/TaskStore');
var TaskList = require('./TaskList');
var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;
var md5 = require('MD5');
var Marty = require('marty');

var ProjectState = Marty.createStateMixin({
  listenTo: [ TaskStore ],
  getState: function () {
    var project = TaskStore.getProject(this.getParams().id);
    var tasks = project.tasks;
    return {
      project: project,
      tasks: tasks
    };
  }
});

var EditProject = React.createClass({
  displayName: 'EditProject',

  mixins: [ Router.State, Navigation, ProjectState ],

  getTaskModel: function() {
    var id = md5(Date.now() + 2);
    return {
      id: id,
      title: '',
      time: 0,
      desc: ''
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var project = {
      _id: this.state.project._id,
      id: this.state.project.id,
      title: this.state.project.title,
      tasks: this.state.tasks
    };

    TaskViewActions.updateProject(project);
    this.transitionTo('home');
  },

  render: function() {
    var me = this;
    
    return (
      <div className="createProject container">
        <h3>Edit Project</h3>
        <form action="http://localhost:3000/" className="projectForm form-horizontal" onSubmit={ this.handleSubmit }>
          <div className="createProjectHeader form-group">
            <div className="form-group text-left">
              <label className="col-sm-2 control-label">Project Title: </label>
              <div className="col-sm-10">
                <input type="text" onChange={ me.onTitleChange } className="form-control" name="projectTitle" placeholder="Project Title" ref="projectTitle" defaultValue={ this.state.project.title } />
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
  },

  onTitleChange: function(e) {
    e.preventDefault();
    var project = this.state.project;
    project.title = e.target.value;
    this.setState({
      project: project
    });
  }

});

module.exports = EditProject;