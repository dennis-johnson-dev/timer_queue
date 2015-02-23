jest.dontMock('../src/components/Site');
jest.dontMock('../../test_utils/unit-test-handlers');
jest.dontMock('util');

var React = require('react/addons');
var Router = require('react-router');
var fastclick = require('fastclick');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var ReactTestUtils = React.addons.TestUtils;
var getRouterComponent = require('../../test_utils/unit-test-handlers').getRouterComponent;

var Site = require('../src/components/Site');

describe('Site', function() {
  fastclick.attach = jest.genMockFn();

  it('initializes site', function() {
    var div = document.createElement('div');
    this.component = getRouterComponent(Site);
    var content = ReactTestUtils.findRenderedDOMComponentWithClass(this.component, 'content');
    expect(content).toBeDefined();
  });
});
