/** @jsx React.DOM */
var React = require('react');
var TaskStore = require('./store/TaskStore');
var TaskList = require('./TaskList');
var TaskActions = require('./actions/TaskActions');

var ENTER_KEY_CODE = 13;

var Project = React.createClass({
  displayName: 'Project',

  getInitialState: function() {
    var project = this.props.project;

    return {
      project: project
    };
  },

  componentDidMount: function() {
    TaskStore.addChangeListener(this._onChange); 
  },

  create: function() {
    if (this.state.value && this.state.value >= 0) {
      var task = {
        id: 13 + parseInt(this.state.value),
        time: parseInt(this.state.value),
        title: this.state.title,
        desc: this.state.description
      };
      TaskActions.create(task);
      this.setState({
        value: ''
      });
    }
  },

  render: function() {
    var counter = 0;
    var url = "/play/" + this.state.project.id;
    return (
      <div>
        <input 
          type="text"
          onKeyDown={ this._onKeyDown } 
        />
        <input 
          type="text"
          onChange={ this._handleChange.bind(this, 'title') }
          onKeyDown={ this._onKeyDown } 
          value={ this.state.title } 
        />
        <textarea 
          name="task"
          onChange={ this._handleChange.bind(this, 'description') }
          value={ this.state.description }
        />
        <button onClick={ this.create }>Create</button>
        <ul>
          {
            <TaskList tasks={ this.state.project.tasks } />
          }
        </ul>
        <a href={ url }>Start</a>
      </div>
    );
  },

  _handleChange: function(event, type) {
    this.setState({ 
      value: event.target.value,
      description: event.target.description,
      title: event.target.title
    });
  },

  _onKeyDown: function(e) {
    if (e.keyCode === ENTER_KEY_CODE && this.state.value !== '') {
      this.create();
    }
  },

  _onChange: function() {
    this.setState({
      project: TaskStore.getProject()
    });
  }

});

module.exports = Project;