/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var TaskViewActions = require('../actions/TaskViewActions');
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
    var refs = this.refs;
    var keys = _.filter(Object.keys(refs), function(key) {
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
      _id: md5(Object.keys(tasks).toString() + Date.now()),
      title: this.refs.projectTitle.getDOMNode().value,
      tasks: tasks
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
    var tasks = this.state.tasks;
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
            <ul className="task-holder">
            {
              tasks.map(function(task, index) {
                return (
                  <li key={ index }>
                    <div className="form-group text-left">
                      <label className="col-sm-2 control-label">Description: </label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" ref={ index + "desc" } defaultValue={ task.desc } />
                      </div>
                      <input type="hidden" ref={ index + "_id" } defaultValue={ index } />
                      <input type="hidden" ref={ index + "time" } value={ task.time } defaultValue={ 0 } />
                    </div>
                    <div className="form-group text-left">
                      <label className="col-sm-2 control-label">Duration: </label>
                      <div className="col-sm-10">
                        <input data-id={ index } type="number" defaultValue={ 0 } onChange={ me.handleDurationChange } ref={ index + "hours" } className="form-control duration" placeholder="00"/> :
                        <input data-id={ index } type="number" defaultValue={ 0 } onChange={ me.handleDurationChange } ref={ index + "minutes" } className="form-control duration" placeholder="00"/> :
                        <input data-id={ index } type="number" defaultValue={ 0 } onChange={ me.handleDurationChange } ref={ index + "seconds" } className="form-control duration" placeholder="00"/>
                        <span>  { formatTime(task.time) }</span>
                      </div>
                    </div>
                  </li>
                );
              })
            }
            </ul>
          </div>
          <div className="form-group">
            <button onClick={ me.onAddTask } className="add-task-btn btn btn-default btn-block">Add Task</button>
            <input className="project-submit-btn btn btn-default btn-block" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  },

  handleDurationChange: function(e) {
    var index = parseInt(e.target.dataset.id);
    var newTime = this.getTaskTime(index);
    var tasks = this.state.tasks;
    tasks[index].time = newTime;
    this.setState({ tasks: tasks });
  },

  getTaskTime: function(index) {
    var seconds = parseInt(this.refs[index + 'seconds'].getDOMNode().value) || 0;
    var minutes = parseInt(this.refs[index + 'minutes'].getDOMNode().value) || 0;
    var hours = parseInt(this.refs[index + 'hours'].getDOMNode().value) || 0;
    return hours * 3600 + minutes * 60 + seconds; 
  },

  onAddTask: function(e) {
    e.preventDefault();

    var taskModel = this.getTaskModel();
    var tasks = this.state.tasks;

    tasks.push(taskModel);
    this.setState({ tasks: tasks });
  },

  onDeleteTask: function(e) {
    var value = e.target.value || e.target.parentNode.value;
    var tasks = this.state.tasks;
    var result = tasks.splice(parseInt(value), 1);
    this.setState({ tasks: tasks });
    e.preventDefault();
  }

});

module.exports = CreateProject;
