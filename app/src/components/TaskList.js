var React = require('react');
var _ = require('lodash');
var formatTime = require('../lib/formatTime');

var TaskList = React.createClass({

  render: function() {
    var me = this;
    return (
      <ul className="task-holder">
       {
        this.props.tasks.map((task, index) => {
          const displayTime = me.getDisplayTime(task.get('time'));
          return (
            <li key={ index }>
              <div className="form-group text-left">
                <label className="col-sm-2 control-label">Description: </label>
                <div className="col-sm-10">
                  <input data-id={ index } type="text" className="form-control" onChange={ me.onChange } ref={ index + "desc" } defaultValue={ task.get('desc') } />
                </div>
                <input type="hidden" ref={ index + "_id" } defaultValue={ index } />
                <input type="hidden" ref={ index + "time" } value={ task.get('time') } defaultValue={ 0 } />
              </div>
              <div className="form-group text-left">
                <label className="col-sm-2 control-label">Duration: </label>
                <div className="col-sm-10">
                  <input data-id={ index } type="text" maxLength="2"  onChange={ me.onChange } ref={ index + "hours" } className="form-control duration" placeholder="00" defaultValue={ displayTime.hours } />
                  <span className="duration-colon">:</span>
                  <input data-id={ index } type="text" maxLength="2"  onChange={ me.onChange } ref={ index + "minutes" } className="form-control duration" placeholder="00" defaultValue={ displayTime.minutes } />
                  <span className="duration-colon">:</span>
                  <input data-id={ index } type="text" maxLength="2"  onChange={ me.onChange } ref={ index + "seconds" } className="form-control duration" placeholder="00" defaultValue={ displayTime.seconds } />
                  <span className="formatted-duration">  { formatTime(task.get('time')) }</span>
                </div>
              </div>
            </li>
          );
        }).toJS()
       }
       </ul>
    );
  },

  getDisplayTime: function(time) {
    let hours, minutes = null;
    let seconds;

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
    const index = e.target.dataset.id;
    const tasks = this.props.tasks;
    let task = tasks.get(index);
    const seconds = this._getTimeValue(index, 'seconds');
    const minutes = this._getTimeValue(index, 'minutes');
    const hours = this._getTimeValue(index, 'hours');
    task = task.set('time', seconds + minutes + hours);
    task = task.set('desc', this.refs[index + 'desc'].getDOMNode().value);
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
