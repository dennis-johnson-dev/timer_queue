/** @jsx React.DOM */
var React = require('react');
var TaskStore = require('../store/TaskStore');
var TaskViewActions = require('../actions/TaskViewActions');
var Router = require('react-router');
var Link = Router.Link;

var ProjectList = React.createClass({
  displayName: 'ProjectList',

  getInitialState: function() {
    return {
      edit: false,
      projects: TaskStore.getProjects()
    };
  },

  componentDidMount: function() {
    console.log('here');
    TaskStore.addChangeListener(this._onChange); 
  },

  componentWillUnmount: function() {
    TaskStore.removeChangeListener(this._onChange); 
  },

  render: function() {
    var me = this;
  	return (
      <div className="project">
        <h3>Projects <a href="#" onClick={ this._onEdit }><i className="fa fa-gear"></i></a></h3>
        <Link to="create">Create New</Link>
        <ul>
          {
            this.state.projects.map(function(project) {
              var content = me.state.edit ? <button onClick={ me._onDelete } value={ project._id }>Delete</button> : '';
              return (
                <li key={ project._id }>
                  <Link to="play" params={{ id: project._id }}>{ project.title }</Link>
                  { content }
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  },

  _onChange: function() {
    this.setState({ projects: TaskStore.getProjects() });
  },

  _onDelete: function(e) {
    e.preventDefault();
    TaskViewActions.deleteProject(e.target.value);
  },

  _onEdit: function(e) {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
  }

});

module.exports = ProjectList;