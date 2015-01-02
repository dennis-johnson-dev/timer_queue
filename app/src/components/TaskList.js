/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var formatTime = require('../lib/formatTime');

var TaskList = React.createClass({
  getInitialState: function() {
    return {
      tasks: this.props.tasks
    };
  },

  render: function() {
    var me = this;
    return (
      <ul className="task-holder">
       {
        this.state.tasks.map(function(task, index) {
          return (
            <li key={ index }>
              <div className="form-group text-left">
                <label className="col-sm-2 control-label">Description: </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" ref={ index + "desc" } defaultValue={ task.desc } />
                </div>
                <input type="hidden" ref={ index + "_id" } defaultValue={ index } />
                <input type="hidden" ref={ index + "time" } value={ task.time } defaultValue={ 0 } />
              </div>
              <div className="form-group text-left">
                <label className="col-sm-2 control-label">Duration: </label>
                <div className="col-sm-10">
                  <input data-id={ index } data-type="hours" type="text" maxLength="2"  onChange={ me.onChange } ref={ index + "hours" } className="form-control duration" placeholder="00"/>
                  <span className="duration-colon">:</span>
                  <input data-id={ index } data-type="minutes" type="text" maxLength="2"  onChange={ me.onChange } ref={ index + "minutes" } className="form-control duration" placeholder="00"/>
                  <span className="duration-colon">:</span>
                  <input data-id={ index } data-type="seconds" type="text" maxLength="2"  onChange={ me.onChange } ref={ index + "seconds" } className="form-control duration" placeholder="00"/>
                  <span className="formatted-duration">  { formatTime(task.time) }</span>
                </div>
              </div>
            </li>
          );
        })
       }
       </ul>
    );
  },

  onChange: function(e) {
    var index = e.target.dataset.id;
    var tasks = this.state.tasks;
    var task = tasks[index];
    var type = e.target.dataset.type;
    var seconds = this._getTimeValue(index, 'seconds');
    var minutes = this._getTimeValue(index, 'minutes');
    var hours = this._getTimeValue(index, 'hours');
    task.time = seconds + minutes + hours; 
    this.props.onTaskChange(task, index); 
  },

  _getTimeValue: function(index, key) {
    var modifier = 1;
    if (key === "minutes") {
      modifier = 60;
    }
    if (key === "hours") {
      modifier = 3600;
    }
    return parseInt(this.refs[index + key].getDOMNode().value) * modifier || 0; 
  },


});

module.exports = TaskList;
