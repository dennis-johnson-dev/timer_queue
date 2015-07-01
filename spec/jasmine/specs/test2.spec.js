describe('TaskLister', () => {
  let TaskLister;
  const React = require('react');
  const TestUtils = require('react/lib/ReactTestUtils');
  const Immutable = require('immutable');

  beforeEach(() => {
    TaskLister = require('../../components/TaskLister.js');
  });

  it('renders component', () => {
    const props = {
      tasks: Immutable.List([{
        time: 42,
        desc: 'yoyo description'
      }]),
      onTaskChange: () => {}
    };
    const taskLister = TestUtils.renderIntoDocument(<TaskLister { ...props }/>);
    const taskHolderCls = TestUtils.findRenderedDOMComponentWithClass(taskLister, 'task-holder')
    expect(taskLister).toBeDefined();
  });
});
