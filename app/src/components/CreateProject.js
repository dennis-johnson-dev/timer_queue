/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var Router = require('react-router');
var TaskActions = require('../actions/TaskActions');
var Link = Router.Link;

var CreateProject = React.createClass({
  displayName: 'CreateProject',

  getTaskModel: function() {
    return {
      title: 'ho',
      time: Date.now(),
      desc: 'test'
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    console.log('submitted');
  },

  getInitialState: function() {
    return {
      tasks: []
    };
  },

  render: function() {
    var me = this;
    return (
      <div>
        <p>Create a new project</p>
        <form className="projectForm" onSubmit={ this.handleSubmit }>
          <input type="text" name="projectTitle" placeholder="Project Title" ref="projectTitle" />
          <button onClick={ me.onAddTask }>Add Task</button>
          <ul className="taskList" ref="tasks">
            {
              this.state.tasks.map(function(task, index) {
                return ( 
                  <li key={ index } className="taskHolder">
                    <input type="text" ref="task-title" placeholder={ task.title }/>
                    <input type="text" ref="task-time" placeholder={ task.time }/>
                    <input type="text" ref="task-desc" placeholder={ task.desc }/>
                    <button onClick={ me.onDeleteTask } value={ index }><i className="fa fa-times"></i></button>
                  </li>
                );
              })
            }
          </ul>
          <input className="projectSubmit" type="submit" value="Submit" />
      </form>
      </div>
    );
  },

  onAddTask: function(e) {
    e.preventDefault();
    
    var taskModel = this.getTaskModel();
    var tasks = this.state.tasks;
    
    tasks.unshift(taskModel);
    this.setState({ tasks: tasks });
    
    console.log('Task added');
  },

  onDeleteTask: function(e) {
    var value = e.target.value || e.target.parentNode.value;
    var tasks = this.state.tasks;
    console.log("value", value);
    var result = tasks.splice(parseInt(value), 1);
    this.setState({ tasks: tasks });
    e.preventDefault();
  }

});

module.exports = CreateProject;