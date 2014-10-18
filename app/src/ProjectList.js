/** @jsx React.DOM */
var React = require('react');
var TaskStore = require('./store/TaskStore');
var TaskList = require('./TaskList');

var ProjectList = React.createClass({
  displayName: 'ProjectList',

  getInitialState: function() {
    var projects = TaskStore.getProjects();

    return {
      projects: projects
    };
  },

  render: function() {
    var counter = 0;
  	return (
      <div>
        <ul>
          {
            this.state.projects.map(function(project) {
              var url = "play/" + project.id;
              return <li key={ counter++ }><a href={ url }>{ project.title }</a></li>
            })
          }
        </ul>
      </div>
    );
  }

});

module.exports = ProjectList;