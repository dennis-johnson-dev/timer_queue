var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

jest.dontMock('../src/CountDown');
var CountDown = require('../src/CountDown');

describe('countdown', function() {
  it('initializes', function() {
    var countdown = TestUtils.renderIntoDocument(CountDown({total: "10"}));
    expect(countdown.state.total).toBe(10); 
  });

  it('decrements the time', function() {
    var countdown = TestUtils.renderIntoDocument(CountDown({total: "10"}));

    countdown.juice = jest.genMockFn().mockImplementation(function() {
      return {
        "data": [1,2,3]  
      };
    });

    countdown.decrement();
    var data = countdown.juice();
    expect(countdown.state.total).toBe(9);
    expect(data.data).toEqual([1,2,3]);
  });

});
