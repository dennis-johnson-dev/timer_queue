/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var formatTime = require('../lib/formatTime');

var TaskList = React.createClass({

  render: function() {
    var me = this;
    return (
      <ul className="task-holder">
       {
        this.props.tasks.map(function(task, index) {
          var displayTime = me.getDisplayTime(task.time);
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
                  <input data-id={ index } type="text" maxLength="2"  onChange={ me.onChange } ref={ index + "hours" } className="form-control duration" placeholder="00" defaultValue={ displayTime.hours } />
                  <span className="duration-colon">:</span>
                  <input data-id={ index } type="text" maxLength="2"  onChange={ me.onChange } ref={ index + "minutes" } className="form-control duration" placeholder="00" defaultValue={ displayTime.minutes } />
                  <span className="duration-colon">:</span>
                  <input data-id={ index } type="text" maxLength="2"  onChange={ me.onChange } ref={ index + "seconds" } className="form-control duration" placeholder="00" defaultValue={ displayTime.seconds } />
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

  getDisplayTime: function(time) {
    var hours = null;
    var minutes = null;
    var seconds = null;

    while (time/3600 > 1) {
      time -= 3600;
      hours += 1;
    }

    while (time/60 >= 1) {
      time -= 60;
      minutes += 1;
    }

    seconds = time > 0 ? time : null;

    var displayTime = {
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };

    return displayTime;
  }, 

  onChange: function(e) {
    var index = e.target.dataset.id;
    var tasks = this.props.tasks;
    var task = tasks[index];
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
