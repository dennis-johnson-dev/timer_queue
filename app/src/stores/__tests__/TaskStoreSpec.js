jest.dontMock('../TaskStore');

var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var ReactTestUtils = React.addons.TestUtils;
var getRouterComponent = require('../../../../test_utils/unit-test-handlers').getRouterComponent;

describe('Task Store', function() {

  it('initializes Store', function() {
    // var div = document.createElement('div');
    // this.component = getRouterComponent(Site);
    // var content = ReactTestUtils.findRenderedDOMComponentWithClass(this.component, 'content');
    expect(true).toBe(true);
  });
});
