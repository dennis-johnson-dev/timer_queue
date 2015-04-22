var React = require('react');
var TaskStore = require('../stores/TaskStore');
var OptimisticStore = require('../stores/OptimisticStore');
var TaskViewActions = require('../actions/TaskViewActions');
var Router = require('react-router');
var Link = Router.Link;
var Marty = require('marty');

class ProjectList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.displayName = 'ProjectList';
    this.state = {
      edit: false,
      projects: this.props.projects
    };
  }

  render() {
    var me = this;
    const deleteHandler = this._onDelete.bind(this);
    const editHandler = this._onEdit.bind(this);
    const editModeHandler = this._onEditMode.bind(this);
  	return (
      <div className="project">
        <h3>
          Projects
          <a className="project-tools" href="#" onClick={ editModeHandler }><i className="glyphicon glyphicon-cog"></i></a>
        </h3>
        <div className="list-group project-container">
          {
            this.props.projects.map(function(project) {
              var editBtns = <div className="editBtns">
                               <button onClick={ deleteHandler } value={ project.id }>Delete</button>
                               <button onClick={ editHandler } value={ project.id }>Edit</button>
                             </div>
              var btnContent = me.state.edit ? editBtns : '';
              return (
                <Link to="play" className="list-group-item" key={ project.id } params={{ id: project.id }}>
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
  }

  _onDelete(e) {
    e.preventDefault();
    TaskViewActions.deleteProject(e.target.value);
  }

  _onEdit(e) {
    e.preventDefault();
    this.context.router.transitionTo('edit', { id: e.target.value });
  }

  _onEditMode(e) {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
  }

}

ProjectList.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Marty.createContainer(ProjectList, {
  listenTo: [ TaskStore, OptimisticStore ],
  fetch: {
    projects() {
      return TaskStore.for(this).getProjects();
    } 
  }
});
