var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Marty = require('marty');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var TaskViewActions = require('../actions/TaskViewActions');
var Immutable = require('immutable');

class Site extends React.Component {
  displayName: 'Site'

  render() {
    var notification = null;
    var errors = this.props.errors || null;
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
  }

  retry(e) {
    e.preventDefault();
    TaskViewActions.retry();
  }

  _onRemoveError(e) {
    var error = {
      errorId: e.target.dataset.errorid,
      actionId: e.target.dataset.actionid
    };

    AppActions.removeError(error);
  }

  _onErrorResolve(e) {
    var error = {
      errorId: e.target.dataset.errorid,
      actionId: e.target.dataset.actionid
    };

    AppActions.resolveError(error);
  }

}

module.exports = Marty.createContainer(Site, {
  listenTo: [ AppStore ],
  fetch: {
    errors() {
      return AppStore.for(this).getErrors();
    } 
  }
});
