/** @jsx React.DOM */

var React = require('react/addons');
var ReactTestUtils;
var countdown;

describe('Countdown', function() {
  beforeEach(function() {
    ReactTestUtils = React.addons.TestUtils; 
     
    CountDown = require('../../app/src/CountDown.js');
  });

  it('renders as the correct component', function() {
    countdown = ReactTestUtils.renderIntoDocument(<CountDown total="10" />);
    var domNode = countdown.refs.total;
    expect(countdown.getDOMNode().textContent).toContain('Total: ');
  });
});
