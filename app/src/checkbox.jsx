/** @jsx React.DOM */

module.exports = React.createClass({
  getInitialState: function() {
    return { isChecked: false };
  },
  onChange: function() {
    this.setState({isChecked: !this.state.isChecked});
  },
  render: function() {
   return (
     <div>
       <input
         type="checkbox"
         checked={this.state.isChecked}
         onChange={this.onChange}
       />
       {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
     </div>
   );
  }
});
