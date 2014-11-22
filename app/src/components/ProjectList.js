/** @jsx React.DOM */
var React = require('react');
var TaskStore = require('../store/TaskStore');
var TaskList = require('./TaskList');
var Router = require('react-router');
var Link = Router.Link;

var ProjectList = React.createClass({
  displayName: 'ProjectList',

  getInitialState: function() {
    return {
      projects: TaskStore.getProjects()
    };
  },

  componentDidMount: function() {
    TaskStore.addChangeListener(this._onChange); 
  },

  componentWillUnmount: function() {
    TaskStore.removeChangeListener(this._onChange); 
  },

  render: function() {
  	return (
      <div className="project">
        <h3>Projects</h3>
        <ul>
          {
            this.state.projects.map(function(project) {
              return <li key={ project._id }><Link to="play" params={{ id: project._id }}>{ project.title }</Link></li>
            })
          }
        </ul>
      </div>
    );
  },

  _onChange: function() {
    this.setState({ projects: TaskStore.getProjects() });
  }

});

module.exports = ProjectList;