/** @jsx React.DOM */

var CountDown = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
      </div>
    );
  }
});

var CheckboxWithLabel = React.createClass({
  getInitialState: function() {
    return { isChecked: false };
  },
  onChange: function() {
    this.setState({ isChecked: !this.state.isChecked });
  },
  render: function() {
    return (
      <label>
        <CountDown time={ 60 } />
        <input
          type="checkbox"
          checked={ this.state.isChecked }
          onChange={ this.onChange }
        />
        { this.state.isChecked ? this.props.labelOn : this.props.labelOff }
      </label>
    );
  }
});

