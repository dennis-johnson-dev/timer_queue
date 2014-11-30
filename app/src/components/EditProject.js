/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var TaskViewActions = require('../actions/TaskViewActions');
var TaskStore = require('../store/TaskStore');
var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;
var md5 = require('MD5');

var EditProject = React.createClass({
  displayName: 'EditProject',

  mixins: [Router.State, Navigation],

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
        var domVal = refs[value].getDOMNode().value;
        output[key] = key === "time" ? parseInt(domVal) : domVal;
        return output;
      }, {});
      
      result.push(row);
      return result;
    }, []);

    var project = {
      _id: this.state.project._id,
      title: refs.projectTitle.getDOMNode().value,
      tasks: tasks
    };

    TaskViewActions.updateProject(project);
    this.transitionTo('home');
  },

  getInitialState: function() {
    return {
      project: TaskStore.getProject(this.getParams().id)
    };
  },

  render: function() {
    var me = this;
    return (
      <div>
        <p>Edit</p>
        <form action="http://localhost:3000/" className="projectForm" onSubmit={ this.handleSubmit }>
          <input className="projectSubmit" type="submit" value="Submit" />
          <p>Project Title</p>
          <input type="text" ref="projectTitle" defaultValue={ this.state.project.title } />
          <ul>
            {
              this.state.project.tasks.map(function(task, index) {
                return <li key={ task._id }>
                    <p>Task Title:</p>
                    <input type="text" ref={ index + "title" } defaultValue={ task.title } />
                    <p>Task Duration:</p>
                    <input type="text" ref={ index + "time" } defaultValue={ task.time } />
                    <p>Task Desc:</p>
                    <input type="text" ref={ index + "desc" } defaultValue={ task.desc } />
                    <input type="hidden" ref={ index + "_id" } value={ task._id } />
                  </li>
              })
            }
          </ul>
        </form>
      </div>
    );
  }

});

module.exports = EditProject;