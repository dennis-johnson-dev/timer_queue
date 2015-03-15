var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var fastclick = require('fastclick');
var Marty = require('marty');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var TaskViewActions = require('../actions/TaskViewActions');
var Immutable = require('immutable');

var AppState = Marty.createStateMixin({
  listenTo: [ AppStore ],
  getState: function () {
    return {
      errors: AppStore.getErrors()
    };
  }
});

var Site = React.createClass({
  displayName: 'Site',

  mixins: [ AppState ],

  componentDidMount: function() {
    fastclick.attach(document.body);
  },

  render: function() {
    var notification = null;
    var errors = this.state.errors || null;
    if (errors) {
      notification = <p>An error has occurred <a href="" onClick={ this.retry }>Click to retry</a></p>;
    }
    return (
      <div className="content">
        <ul className="nav">
          <li><Link to="home">Home</Link></li>
        </ul>
        { notification }
        <RouteHandler />
      </div>
    );
  },

  retry: function(e) {
    e.preventDefault();
    TaskViewActions.retry();
  },

  _onRemoveError: function(e) {
    var error = {
      errorId: e.target.dataset.errorid,
      actionId: e.target.dataset.actionid
    };

    AppActions.removeError(error);
  },

  _onErrorResolve: function(e) {
    var error = {
      errorId: e.target.dataset.errorid,
      actionId: e.target.dataset.actionid
    };

    AppActions.resolveError(error);
  }

});

module.exports = Site;
