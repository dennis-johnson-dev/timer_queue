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
      <div>
        <ul>
          <li><Link to="home">Home</Link></li>
        </ul>
        <h3>Projects</h3>
        <ul>
          {
            this.state.projects.map(function(project) {
              return <li key={ project._id }><Link to="project" params={{ id: project._id }}>{ project.title }</Link></li>
            })
          }
        </ul>

        <this.props.activeRouteHandler />
      </div>
    );
  },

  _onChange: function() {
    this.setState({ projects: TaskStore.getProjects() });
  }

});

module.exports = ProjectList;