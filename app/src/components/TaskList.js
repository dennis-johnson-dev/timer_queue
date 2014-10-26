/** @jsx React.DOM */
var React = require('react');

var TaskList = React.createClass({
  displayName: 'TaskList',

  getInitialState: function() {
    var tasks = this.props.tasks;

    return {
      tasks: tasks
    };
  },

  render: function() {
    return (
        <ul className="Task-List">
          { 
            this.state.tasks.map(function(task) {
              return <li key={ task.id }>
                       <ul id="task_holder">
                         <li>{ task.title }</li>
                         <li>{ task.desc }</li>
                         <li>{ task.time }</li>
                       </ul>
                     </li>; 
            })
          }
        </ul>
    );
  }

});

module.exports = TaskList;