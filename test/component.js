var React = require('react');

module.exports = React.createClass({
  displayName: 'TodoItem',

  getInitialState: function() {
    return { done: this.props.done }
  },

  render: function() {
    return (
      <label>
        <input type="checkbox" defaultChecked={this.state.done} />
        {this.props.name}
      </label>
    );
  }
});