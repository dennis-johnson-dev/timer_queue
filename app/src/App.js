var React = require('react');
var Marty = require('marty');

var AppAPI = require('./api/AppAPI');
var enableFastclick = require('./lib/enableFastclick');

var Site = require('./components/Site');
var CountDownContainer = require('./components/CountDownContainer');
var ProjectList = require('./components/ProjectList');
var CreateProject = require('./components/CreateProject');
var EditProject = require('./components/EditProject');

var rootInstance = null;

var Router = require('./Router');
var routes = require('./Routes');

enableFastclick();
Marty.rehydrate();
Router.run(function(Handler, state) {
  rootInstance = React.render(<Handler {...state.params} />, document.getElementById('site'));
});

if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function () {
      // Help React Hot Loader figure out the root component instances on the page:
      return [rootInstance];
    }
  });
}