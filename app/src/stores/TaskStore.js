const _ = require('lodash');
const AppConstants = require('../constants/AppConstants');
const TaskConstants = require('../constants/TaskConstants');
const Marty = require('marty');
const Immutable = require('immutable');
const TaskQueries = require('../queries/TaskQueries');

class OptimisticStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.handlers = {
      _setProjects: TaskConstants.RECEIVE_PROJECTS,
      cleanup: TaskConstants.CLEANUP_RECORD,
      revertUpdate: TaskConstants.REVERT_UPDATE,
      revertUpdates: TaskConstants.REVERT_UPDATES,
      createProject: TaskConstants.CREATE_PROJECT_OPTIMISTIC,
      deleteProject: TaskConstants.DELETE_PROJECT_OPTIMISTIC,
      updateProject: TaskConstants.UPDATE_PROJECT_OPTIMISTIC
    };

    this.history = new Immutable.List();
    const initialState = this.getInitialState();
    this.history = this.history.push(initialState);
    this.actionQueue = new Immutable.List();
  }

  handleAction(action) {
    // needs to only apply to records, not all actions
    // maybe a naming convention
    if (_.contains(action.type, 'OPTIMISTIC')) {
      // use ES6 symbols to store isDirty
      for (let argument of action.arguments) {
        if (_.isArray(argument)) {
          for (let arg of argument) {
            arg = this._markAsDirty(arg);
          }
        } else {
          argument = this._markAsDirty(argument);
        }
      }
    }

    if (!_.contains(action.type, 'REVERT_UPDATE') && (!_.contains(action.type, 'CLEANUP'))) {
      this.actionQueue = this.actionQueue.push(action);
    }
    super.handleAction(action);
  }

  getInitialState() {
    return {
      projects: new Immutable.List()
    };
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
    this.replaceState(prevState);
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
    this.history = this.history.first();
    this.actionQueue = new Immutable.List();
    this.hasChanged();
  }

  _setProjects(projects) {
    this.state.projects = new Immutable.fromJS(projects);
    this.hasChanged();
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
        if (this.hasAlreadyFetched('projects')) {
          return this.state.projects;
        }
      },
      remotely: function() {
        return this.app.TaskQueries.getProjects();
      }
    });
  }

  createProject(project) {
    this.state.projects = this.state.projects.push(Immutable.fromJS(project));
    this.hasChanged();
  }

  deleteProject(id) {
    const index = this.state.projects.findIndex((project) => {
      return project.get('id') === id;
    });

    if (index > -1) {
      this.state.projects = this.state.projects.delete(index);
    }

    this.state.projects = this.state.projects.filter((project) => {
      return !_.isUndefined(project);
    });

    this.hasChanged();
  }

  updateProject(project) {
    const index = this.state.projects.findIndex((proj) => {
      return proj.get('id') === project.id;
    });

    if (index > -1 ) {
      this.state.projects = this.state.projects.set(index, Immutable.fromJS(project));
    }

    this.hasChanged();
  }

  _markAsDirty(arg) {
    return Object.assign(arg, { isDirty: true });
  }
}

module.exports = OptimisticStore;
