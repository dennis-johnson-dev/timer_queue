var React = require('react/addons');
var ReactTestUtils = React.addons.TestUtils;
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var TestLocation = require('react-router/modules/locations/TestLocation');

module.exports = {
  getRouterComponent: function(Component) {
    var component;
    var div = document.createElement('div');
    var routes = [
      React.createFactory(Route)({
        name: "home",
        handler:Component
      }),
      React.createFactory(Route)({
        name: "edit",
        handler:Component
      }),
      React.createFactory(Route)({
        name: "create",
        handler:Component
      })

    ];
    TestLocation.history = ['/home'];

    Router.run(routes, TestLocation, function (Handler) {
      var mainComponent = React.render(React.createFactory(Handler)({}), div);
      component = ReactTestUtils.findRenderedComponentWithType(mainComponent, Component);
    });

    return component;
  }
};
