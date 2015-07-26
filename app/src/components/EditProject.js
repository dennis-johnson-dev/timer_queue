import React from 'react';
import { Navigation } from 'react-router';
import _ from 'lodash';
import TaskStore from '../stores/TaskStore';
import TaskList from './TaskList';
import md5 from 'MD5';
import Marty from 'marty';
import Immutable from 'immutable';

const EditProject = React.createClass({
  displayName: 'EditProject',

  mixins: [ Navigation ],

  getInitialState() {
    const project = this.props.project;
    const tasks = project.get('tasks');
    return {
      project,
      tasks
    };
  },

  getTaskModel() {
    const id = md5(Date.now() + 2);
    return Immutable.Map({
      id: id,
      title: '',
      time: 0,
      desc: ''
    });
  },

  handleSubmit(e) {
    e.preventDefault();
    const project = {
      id: this.state.project.get('id'),
      title: this.state.project.get('title'),
      tasks: this.state.tasks.toJS()
    };

    this.app.TaskViewActions.updateProject(project);
    this.transitionTo('/');
  },

  render() {
    if (!this.props.project) {
      return null;
    }
    const me = this;

    let action;
    if (process.env && process.env.DEV) {
      action = "http://localhost:3000";
    } else {
      action = "http://timerqueue.herokuapp.com";
    }
    return (
      <div className="createProject container">
        <h3>Edit Project</h3>
        <form action={ action } className="projectForm form-horizontal" onSubmit={ this.handleSubmit }>
          <div className="createProjectHeader form-group">
            <div className="form-group text-left">
              <label className="col-sm-2 control-label">Project Title: </label>
              <div className="col-sm-10">
                <input type="text" onChange={ me.onTitleChange } className="form-control" name="projectTitle" placeholder="Project Title" ref="projectTitle" defaultValue={ this.state.project.get('title') } />
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

  handleTaskChange(task, index) {
    const tasks = this.state.tasks.set(index, task);
    this.setState({ tasks: tasks });
  },

  onAddTask(e) {
    e.preventDefault();

    const taskModel = this.getTaskModel();
    const tasks = this.state.tasks.push(taskModel);
    this.setState({ tasks: tasks });
  },

  onTitleChange(e) {
    e.preventDefault();
    let project = this.state.project;
    project = project.set('title', e.target.value);
    this.setState({
      project: project
    });
  }

});

module.exports = Marty.createContainer(EditProject, {
  listenTo: 'TaskStore',
  fetch: {
    project() {
      return this.context.app.TaskStore.getProject(this.props.params.id);
    }
  }
});
