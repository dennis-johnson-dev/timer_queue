const React = require('react');
const Router = require('react-router');
const Link = Router.Link;

const ProjectList = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  displayName: 'ProjectList',

  getInitialState() {
    return {
      edit: false
    };
  },

  render() {
    const me = this;
    if (!this.props.projects) {
      return null;
    }
  	return (
      <div className="projects">
        <h3>
          Projects
          <a className="project-tools" href="#" onClick={ this._onEditMode }><i className="glyphicon glyphicon-cog"></i></a>
        </h3>
        <div className="list-group project-container">
          {
            this.props.projects.map(function(project) {
              const editBtns = <div className="editBtns">
                               <button onClick={ me._onDelete } value={ project.get('id') }>Delete</button>
                               <button onClick={ me._onEdit } value={ project.get('id') }>Edit</button>
                             </div>
              const btnContent = me.state.edit ? editBtns : '';
              return (
                <Link to="play" className="list-group-item" key={ project.get('id') } params={{ id: project.get('id') }}>
                  <div className="project-title">{ project.get('title') }</div>
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

  _onDelete(e) {
    e.preventDefault();
    this.app.TaskViewActions.deleteProject(e.target.value);
  },

  _onEdit(e) {
    e.preventDefault();
    this.context.router.transitionTo('edit', { id: e.target.value });
  },

  _onEditMode(e) {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
  }

});

module.exports = ProjectList;
