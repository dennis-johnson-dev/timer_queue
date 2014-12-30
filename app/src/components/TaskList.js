/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');

var TaskList = React.createClass({
  render: function() {
    return (
      <ul>
      {
        this.props.tasks.map(function(task, index) {
          return <li>
          <p>Task Duration:</p>
          <input type="text" ref={ index + "time" } defaultValue={ task.time } />
          <p>Task Desc:</p>
          <input type="text" ref={ index + "desc" } defaultValue={ task.desc } />
          <input type="hidden" ref={ index + "_id" } value={ task.id } />
          </li>
        })
      }
      </ul>

    );
  },

  grabRefs: function() {
    return this.refs;
  }
});

module.exports = TaskList;
