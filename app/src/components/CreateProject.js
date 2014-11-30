/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var TaskViewActions = require('../actions/TaskViewActions');
var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;
var md5 = require('MD5');

var CreateProject = React.createClass({
  displayName: 'CreateProject',

  mixins: [Navigation],

  getTaskModel: function() {
    return {
      title: 'ho',
      time: Date.now(),
      desc: 'test'
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var refs = this.refs;
    var keys = _.filter(Object.keys(this.refs), function(key) {
      return !_.isNaN(parseInt(key.slice(0,1)));
    });

    var taskItems = _.groupBy(keys, function(key) {
      return key.slice(0,1);
    });

    var tasks = _.reduce(taskItems, function(result, values, index) {
      var row = _.reduce(values, function(output, value, index) {
        var key = value.slice(1);
        output[key] = refs[value].getDOMNode().value;
        return output;
      }, {});
      
      result.push(row);
      return result;
    }, []);

    var project = {
      _id: md5(Object.keys(tasks).toString() + Date.now()),
      title: refs.projectTitle.getDOMNode().value,
      tasks: tasks
    };

    TaskViewActions.createProject(project);
    this.transitionTo('home');
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
        <form action="http://localhost:3000/" className="projectForm" onSubmit={ this.handleSubmit }>
          <input type="text" name="projectTitle" placeholder="Project Title" ref="projectTitle" />
          <button onClick={ me.onAddTask }>Add Task</button>
          <input className="projectSubmit" type="submit" value="Submit" />
          <ul className="taskList">
            <li>
                <ul className="taskListHeader">
                  <li>Task Title</li>
                  <li>Task Duration</li>
                  <li>Task Description</li>
                </ul>
            </li>
            {
              this.state.tasks.map(function(task, index) {
                return ( 
                  <li key={ index } className="taskHolder">
                    <input type="text" ref={ index + 'title' } placeholder='Title'/>
                    <input type="text" ref={ index + 'time' } placeholder='Duration'/>
                    <input type="text" ref={ index + 'desc' } placeholder='Description'/>
                    <button onClick={ me.onDeleteTask } value={ index }><i className="fa fa-times"></i></button>
                  </li>
                );
              })
            }
          </ul>
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