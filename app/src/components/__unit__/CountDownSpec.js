import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import CountDown from '../CountDown';
import Immutable from 'immutable';

describe('hi', () => {
  it('is true', () => {
    // const countDown = TestUtils.renderIntoDocument(<CountDown />);
    debugger;
    const project = Immutable.fromJS({
      id: 123,
      tasks: [{
        desc: 'yo',
        id: 124,
        time: 3
      }],
      title: 'do'
    });
    const countDown = React.render(<CountDown project={ project }/>, document.body);
    expect(true).toBe(true);
  });
})
