/** @jsx React.DOM */

var ReactTestUtils;
var checkbox;

describe('CheckboxWithLabel:', function() {
  beforeEach(function() {
    ReactTestUtils = React.addons.TestUtils; 
    checkbox = ReactTestUtils.renderIntoDocument(<CheckboxWithLabel labelOn="On" labelOff="Off" />);
  });

  it('renders into document', function() {
    var node = checkbox.getDOMNode();
    expect(ReactTestUtils.isCompositeComponent(checkbox)).toBe(true);
    expect(ReactTestUtils.isDOMComponent(checkbox)).toBe(false);
  });

  it('is off by default', function() {
    var label = ReactTestUtils.findRenderedDOMComponentWithTag(checkbox, 'label');
    expect(label.getDOMNode().textContent).toEqual('Off');
  });

  it('is on after being checked the first time', function() {
    var label = ReactTestUtils.findRenderedDOMComponentWithTag(checkbox, 'label');
    var input = ReactTestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
    ReactTestUtils.Simulate.change(input);
    expect(label.getDOMNode().textContent).toEqual('On');
  });

  it('returns true', function() {
    expect(true).toBe(true);  
  });

});
