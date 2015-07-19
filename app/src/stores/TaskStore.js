const _ = require('lodash');
const TaskConstants = require('../constants/TaskConstants');
const Marty = require('marty');
const Immutable = require('immutable');
const TaskQueries = require('../queries/TaskQueries');

class TaskStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.handlers = {
      _setProjects: TaskConstants.RECEIVE_PROJECTS,
      cleanup: TaskConstants.CLEANUP_RECORD,
      revertUpdate: TaskConstants.REVERT_UPDATE,
      revertUpdates: TaskConstants.REVERT_UPDATES,
      _createProject: TaskConstants.CREATE_PROJECT,
      _deleteProject: TaskConstants.DELETE_PROJECT,
      _updateProject: TaskConstants.UPDATE_PROJECT
    };

    this.history = new Immutable.List();
    const initialState = this.getInitialState();
    this.actionQueue = new Immutable.List();
    this.state = initialState;
  }

  getInitialState() {
    return {
      projects: Immutable.List()
    };
  }

  rehydrate(newState) {
    const newProjects = Immutable.fromJS(newState.projects);
    this.state.projects = newProjects;
    this.history = this.history.push(newProjects);
  }

  getProject(id) {
    return this.fetch({
      id: 'project-' + id,
      locally: function() {
        const index = this.state.projects.findIndex((project) => {
          return project.get('id') === id;
        });

        return this.state.projects.get(index);
      },
      dependsOn: this.getProjects()
    });
  }

  getProjects() {
    return this.fetch({
      id: 'projects',
      locally: function() {
        if (this.hasAlreadyFetched('projects') || this.state.projects.count() > 0) {
          return this.state.projects;
        }
      },
      remotely: function() {
        return this.app.TaskQueries.getProjects();
      }
    });
  }

  _setProjects(projects) {
    const newProjects = new Immutable.fromJS(projects);
    this.state.projects = newProjects;
    this.history = this.history.push(newProjects);
    console.log(this.history)
    this.hasChanged();
  }

  _createProject(project) {
    const newProject = Immutable.fromJS(project);
    this.state.projects = this.state.projects.push(newProject);
    this.hasChanged();
  }

  _deleteProject(action) {
    const index = this.state.projects.findIndex((project) => {
      return project.get('id') === action.id;
    });

    if (index > -1) {
      this.state.projects = this.state.projects.delete(index);
    }

    // is this needed?
    this.state.projects = this.state.projects.filter((project) => {
      return !_.isUndefined(project);
    });

    this.hasChanged();
  }

  _updateProject(project) {
    const index = this.state.projects.findIndex((proj) => {
      return proj.get('id') === project.id;
    });

    if (index > -1 ) {
      this.state.projects = this.state.projects.set(index, Immutable.fromJS(project));
      // val = this.state.projects;
    }

    this.hasChanged();
  }

  _markAsDirty(arg) {
    return Object.assign(arg, { isDirty: true });
  }

  handleAction(action) {
    // needs to only apply to records, not all actions
    if (action.arguments[1] && action.arguments[1].optimistic) {
      // use ES6 symbols to store isDirty
      if (_.isArray(action.arguments[0])) {
        for (let arg of action.arguments[0]) {
          arg = this._markAsDirty(arg);
        }
      } else {
        action.arguments[0] = this._markAsDirty(action.arguments[0]);
      }
    }

    if (!_.contains(action.type, 'ERROR') &&
      !_.contains(action.type, 'REVERT_UPDATE') &&
      (!_.contains(action.type, 'CLEANUP'))
    ) {
      this.actionQueue = this.actionQueue.push(action);
    }
    super.handleAction(action);
  }

  cleanup(action) {
    // maybe pass in many ids to cleanup depends on api response
    const index = this.state.projects.findIndex((proj) => {
      return proj.get('id') === action.id;
    });

    if (index > -1) {
      this.state.projects = this.state.projects.update(index, (proj) => {
        return proj.set('isDirty', false);
      });
    }

    this.actionQueue = this.actionQueue.shift();

    const cleanProjectRecords = this.state.projects.filter((proj) => {
      return !proj.get('isDirty');
    });

    this.history = this.history.push(cleanProjectRecords);
    this.hasChanged();
  }

  revertUpdate(action) {
    // remove from actionQueue
    const index = this.actionQueue.findIndex((actionEntry) => {
      return actionEntry.id === action.id;
    });
    this.actionQueue = this.actionQueue.delete(index);
    // use previous 'clean' state from history (pop)
    const prevState = Object.create(this.history.last());
    this.state.projects = prevState;
    if (this.history.count() > 1) {
      // are we at the initial state
      this.history = this.history.pop();
    }
    // apply updates from actionQueue
    this.actionQueue.forEach((actionEntry) => {
      super.handleAction(actionEntry);
    });

    this.hasChanged();
  }

  revertUpdates() {
    // need to implement reverting more than one update
    this.history = this.history.first();
    this.actionQueue = new Immutable.List();
    this.hasChanged();
  }
}

module.exports = TaskStore;
