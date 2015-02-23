/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var fastclick = require('fastclick');
var Marty = require('marty');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
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
      notification = errors.map((error, index) => {
        if (index === 0) {
          return (
            <p key={ error.id }>{ error.msg }
              <button data-errorid={ error.id } data-actionid={ error.actionId } onClick={ this._onRemoveError }> Continue</button>
              <button data-errorid={ error.id } data-actionid={ error.actionId } onClick={ this._onErrorResolve }> Undo</button>
            </p>
          );
        } else if (index === 1) {
          return (
            <div>
              <p key={ error.id }>{ error.msg }</p>
            </div>
          )
        } else {
          return <p>...</p>;
        }
      });
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
