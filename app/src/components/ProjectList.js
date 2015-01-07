/** @jsx React.DOM */
var React = require('react');
var TaskStore = require('../store/TaskStore');
var TaskViewActions = require('../actions/TaskViewActions');
var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var ProjectList = React.createClass({
  displayName: 'ProjectList',

  mixins: [Navigation],

  getInitialState: function() {
    return {
      edit: false,
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
    var me = this;
  	return (
      <div className="project">
        <h3>
          Projects haha
          <a className="project-tools" href="#" onClick={ this._onEditMode }><i className="glyphicon glyphicon-cog"></i></a>
        </h3>
        <div className="list-group project-container">
          {
            this.state.projects.map(function(project) {
              var editBtns = <div className="editBtns">
                               <button onClick={ me._onDelete } value={ project._id }>Delete</button>
                               <button onClick={ me._onEdit } value={ project._id }>Edit</button>
                             </div>
              var btnContent = me.state.edit ? editBtns : '';
              return (
                <Link to="play" className="list-group-item" key={ project._id } params={{ id: project._id }}>
                  <div className="project-title">{ project.title }</div>
                  <div className="project-maintenance">{ btnContent}</div>    
                </Link>
              );
            })
          }
        </div>
        <Link className="project-tools" to="create"><i className="glyphicon glyphicon-plus"></i></Link>
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
    this.transitionTo('edit', { id: e.target.value });
  },

  _onEditMode: function(e) {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
  }

});

module.exports = ProjectList;
