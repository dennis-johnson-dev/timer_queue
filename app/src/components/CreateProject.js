const React = require('react');
const Marty = require('marty');
const _ = require('lodash');
const TaskList = require('./TaskList');
const formatTime = require('../lib/formatTime');
const md5 = require('MD5');
const Immutable = require('immutable');

const CreateProject = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  displayName: 'CreateProject',

  getTaskModel: function() {
    const id = md5(Date.now() + 2);
    return Immutable.Map({
      id: id,
      title: '',
      time: 0,
      desc: ''
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    const project = {
      id: md5(Object.keys(this.state.tasks).toString() + Date.now()),
      title: this.refs.projectTitle.getDOMNode().value,
      tasks: this.state.tasks.toJS()
    };

    this.app.TaskViewActions.createProject(project);
    this.context.router.transitionTo('/');
  },

  getInitialState: function() {
    const defaultTask = this.getTaskModel();
    return {
      tasks: Immutable.List([defaultTask])
    };
  },

  render: function() {
    const me = this;
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

  handleTaskChange(updatedTask, index) {
    const tasks = this.state.tasks.update(index, (task) => {
      return updatedTask;
    });
    this.setState({ tasks: tasks });
  },

  onAddTask: function(e) {
    e.preventDefault();

    const taskModel = this.getTaskModel();
    const tasks = this.state.tasks;

    tasks.push(taskModel);
    this.setState({ tasks: tasks });
  }

});

module.exports = Marty.createContainer(CreateProject);
