describe('TaskLister', () => {
  let TaskLister;
  const React = require('react');
  const TestUtils = require('react/lib/ReactTestUtils');
  const Immutable = require('immutable');

  beforeEach(() => {
    TaskLister = require('../../components/TaskLister.js');
  });

  function getFormattedTime({ hours, minutes, seconds }) {
    return hours * 3600 + minutes * 60 + seconds;
  }

  it('renders component', () => {
    const taskList = Immutable.List();
    const time = 42;
    const desc = 'yoyo description';
    const props = {
      tasks: taskList.push({
        time,
        desc
      }),
      onTaskChange: function(task, index) {
        expect(index).toBe('0');
        expect(task.time).toBe(time);
      }
    };
    const taskLister = TestUtils.renderIntoDocument(<TaskLister { ...props }/>);
    expect(taskLister.refs['0time'].props.value).toBe(time);

    const description = React.findDOMNode(taskLister.refs['0desc']);
    expect(description.value).toBe(desc);

    const seconds = React.findDOMNode(taskLister.refs['0seconds']);
    expect(seconds.value).toBe(time.toString());

    TestUtils.Simulate.change(description, {target: { dataset: { id: '0'}}});
  });

  it('shows long time correctly', () => {
    const taskList = Immutable.List();
    const desc = 'hihihi';
    const initialTime = {
      hours: 1,
      minutes: 1,
      seconds: 3
    };
    const time = getFormattedTime(initialTime);
    const props = {
      tasks: taskList.push({
        time,
        desc
      }),
      onTaskChange: function(task, index) {
        expect(index).toBe('0');
        expect(task.time).toBe(time);
      }
    };
    const taskLister = TestUtils.renderIntoDocument(<TaskLister { ...props }/>);
    expect(taskLister.refs['0time'].props.value).toBe(time);

    const hours = React.findDOMNode(taskLister.refs['0hours']);
    expect(hours.value).toBe(initialTime.hours.toString());

    const minutes = React.findDOMNode(taskLister.refs['0minutes']);
    expect(minutes.value).toBe(initialTime.minutes.toString());

    const seconds = React.findDOMNode(taskLister.refs['0seconds']);
    expect(seconds.value).toBe(initialTime.seconds.toString());
  });
});
