const React = require('react');
const Router = require('react-router');
const Link = Router.Link;

const ProjectList = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  displayName: 'ProjectList',

  getInitialState() {
    return {
      edit: false
    };
  },

  render() {
    if (!this.props.projects) {
      return null;
    }
    const projects = this.props.projects.count()
      ? this.props.projects.map((project) => {
        const editBtns =
          <div className="editBtns">
           <button onClick={ this._onDelete } value={ project.get('id') }>Delete</button>
           <button onClick={ this._onEdit } value={ project.get('id') }>Edit</button>
         </div>
        const btnContent = this.state.edit ? editBtns : '';
        const toField = `/play/${project.get('id')}`;
        return (
          <Link to={ toField } className="list-group-item" key={ project.get('id') }>
            <div className="project-title">{ project.get('title') }</div>
            <div className="project-maintenance">{ btnContent}</div>
          </Link>
        );
      }).toJS()
      : null;
  	return (
      <div className="projects">
        <h3>
          Projects
          <a className="project-tools" href="#" onClick={ this._onEditMode }><i className="glyphicon glyphicon-cog"></i></a>
        </h3>
        <div className="list-group project-container">
          { projects }
        </div>
        <Link className="project-tools" to="create"><i className="glyphicon glyphicon-plus"></i></Link>
      </div>
    );
  },

  _onDelete(e) {
    e.preventDefault();
    this.app.TaskViewActions.deleteProject(e.target.value);
  },

  _onEdit(e) {
    e.preventDefault();
    this.context.router.transitionTo(`/edit/${e.target.value}`);
  },

  _onEditMode(e) {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
  }

});

module.exports = ProjectList;
