const _ = require('lodash');
const AppConstants = require('../constants/AppConstants');
const TaskConstants = require('../constants/TaskConstants');
const Marty = require('marty');
const Immutable = require('immutable');
const TaskQueries = require('../queries/TaskQueries');


function createOptimisticStore(spec) {
  return (
    class OptimisticStore extends Marty.Store {
      constructor(options) {
        super(options);

        this.handlers = {
          setProjects: TaskConstants.RECEIVE_PROJECTS,
          createProject: TaskConstants.CREATE_PROJECT,
          cleanup: TaskConstants.CLEANUP_RECORD,
          deleteProject: TaskConstants.DELETE_PROJECT,
          updateProject: TaskConstants.UPDATE_PROJECT,
          revertUpdate: TaskConstants.REVERT_UPDATE
        };

        this.history = Immutable.List();
        this.history = this.history.push(this.getInitialState());
        this.actionQueue = Immutable.List();
      }

      handleAction(action) {
        // needs to only apply to records, not all actions
        this.actionQueue = this.actionQueue.push(action);
        for (let argument of action.arguments) {
          if (_.isArray(argument)) {
            for (let arg of argument) {
              arg = Object.assign(arg, { isDirty: true });
            }
          } else {
            argument = Object.assign(argument, { isDirty: true });
          }
        }
        super.handleAction(action);
      }

      getInitialState() {
        return {
          projects: new Immutable.List()
        };
      }

      cleanup(id, actionId) {
        const index = this.state.projects.findIndex((proj) => {
          return proj.get('id') === id;
        });

        this.state.projects = this.state.projects.update(index, (proj) => {
          return proj.set('isDirty', false);
        });

        // remove action from actionQueue
        // push onto history filtered state (no dirties)
        this.history = this.history.push(this.state.projects);
        this.hasChanged();
      }

      revertUpdate(id, actionId) {
        // remove from actionQueue
        // use previous state from history (pop)
        // apply updates from actionQueue
        this.hasChanged();
      }

      setProjects(projects) {
        this.state.projects = Immutable.fromJS(projects);
        this.hasChanged();
      }

      getProject(id) {
        return this.fetch({
          id: 'project-' + id,
          locally: function() {
            const index = this.state.projects.findIndex(function(project) {
              return project.id === id;
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
    }
  );
}

module.exports = createOptimisticStore({
  handlers: {
    setProjects: TaskConstants.RECEIVE_PROJECTS,
    createProject: TaskConstants.CREATE_PROJECT,
    deleteProject: TaskConstants.DELETE_PROJECT,
    updateProject: TaskConstants.UPDATE_PROJECT
  }
});
