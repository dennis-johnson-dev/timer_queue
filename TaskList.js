/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');

var TaskList = React.createClass({
  render: function() {
    return (
      <ul className="taskList">
            {
              this.props.tasks.map(function(task, index) {
                return ( 
                  <li key={ index } className="taskHolder">
                    <input type="hidden" ref={ index + 'title' } placeholder='Title'/>
                    <input type="text" ref={ index + 'time' } placeholder='Duration'/>
                    <input type="text" ref={ index + 'desc' } placeholder='Description'/>
                    <button onClick={ me.onDeleteTask } value={ index }><i className="fa fa-times"></i></button>
                  </li>
                );
              })
            }
          </ul>
    );
  }
});

module.exports = TaskList;
