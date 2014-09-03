/** @jsx React.DOM */

var ReactTestUtils;
var checkbox;

describe('CheckboxWithLabel:', function() {
  beforeEach(function() {
    ReactTestUtils = React.addons.TestUtils; 
    checkbox = require('../../app/gen/checkbox.js');
    checkbox = ReactTestUtils.renderIntoDocument(<checkbox labelOn="Off" labelOff="On" />);
  });

  it('renders as the correct component', function() {
    var div = ReactTestUtils.findRenderedDOMComponentWithTag(checkbox, 'div');
    expect(div.getDOMNode().textContent).toBe('On');
  });
});
