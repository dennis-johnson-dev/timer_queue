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
      _createProject: TaskConstants.CREATE_PROJECT,
      _deleteProject: TaskConstants.DELETE_PROJECT,
      _updateProject: TaskConstants.UPDATE_PROJECT
    };

    this.history = new Immutable.List();
    const initialState = this.getInitialState();
    this.history = this.history.push(initialState);
    this.actionQueue = new Immutable.List();
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

    if (!_.contains(action.type, 'REVERT_UPDATE') && (!_.contains(action.type, 'CLEANUP'))) {
      this.actionQueue = this.actionQueue.push(action);
    }
    super.handleAction(action);
  }

  getInitialState() {
    return new Immutable.Map({
      projects: new Immutable.List()
    });
  }

  cleanup(action) {
    // maybe pass in many ids to cleanup depends on api response
    const index = this.state.get('projects').findIndex((proj) => {
      return proj.get('id') === action.id;
    });

    if (index > -1) {
      this.state = this.state.set('projects',
        this.state.get('projects').update(index, (proj) => {
          return proj.set('isDirty', false);
        })
      );
    }

    this.actionQueue = this.actionQueue.shift();

    const cleanProjectRecords = this.state.get('projects').filter((proj) => {
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
    this.state = this.state.set('projects', new Immutable.fromJS(projects));
    this.hasChanged();
  }

  getProject(id) {
    return this.fetch({
      id: 'project-' + id,
      locally: function() {
        const index = this.state.get('projects').findIndex((project) => {
          return project.get('id') === id;
        });

        return this.state.get('projects').get(index);
      },
      dependsOn: this.getProjects()
    });
  }

  getProjects() {
    return this.fetch({
      id: 'projects',
      locally: function() {
        if (this.hasAlreadyFetched('projects')) {
          return this.state.get('projects');
        }
      },
      remotely: function() {
        return this.app.TaskQueries.getProjects();
      }
    });
  }

  _createProject(project) {
    this.state = this.state.set('projects',
      this.state.get('projects').push(Immutable.fromJS(project))
    );
    this.hasChanged();
  }

  _deleteProject(action) {
    const index = this.state.get('projects').findIndex((project) => {
      return project.get('id') === action.id;
    });

    if (index > -1) {
      this.state = this.state.set('projects',
        this.state.get('projects').delete(index)
      );
    }

    this.state = this.state.set('projects',
      this.state.get('projects').filter((project) => {
        return !_.isUndefined(project);
      })
    );

    this.hasChanged();
  }

  _updateProject(project) {
    const index = this.state.get('projects').findIndex((proj) => {
      return proj.get('id') === project.id;
    });

    if (index > -1 ) {
      this.state = this.state.set('projects',
        this.state.get('projects').set(index, Immutable.fromJS(project))
      );
    }

    this.hasChanged();
  }

  _markAsDirty(arg) {
    return Object.assign(arg, { isDirty: true });
  }
}

module.exports = OptimisticStore;
