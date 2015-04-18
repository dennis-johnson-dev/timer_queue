var React = require('react/addons');
var _ = require('lodash');
var TaskStore = require('../stores/TaskStore');
var CountDown = require('./CountDown');
var formatTime = require('../lib/formatTime');
var Marty = require('marty');
var Immutable = require('immutable');

var ENTER_KEY_CODE = 13;

class CountDownContainer extends React.Component {
  constructor(options) {
    super(options);
    this.id = this.displayName = 'CountDownContainer';
    this.state = {
      play: false,
      project: this.props.project
    };
  }

  render() {
    return (
      <CountDown tasks={ this.state.project.tasks } title={ this.state.project.title } reset={ this.reset.bind(this) } /> 
    );
  }

  reset(id) {
    this.setState(
      { 
        project: TaskStore.getProject(id).result
      }
    );
  }
  
}

CountDownContainer.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Marty.createContainer(CountDownContainer, {
  listenTo: [ TaskStore ],
  fetch: {
    project() {
      const id = this.props.id;
      return TaskStore.for(this).getProject(id).result;
    } 
  }
});
