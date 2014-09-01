/** @jsx React.DOM */


var App = React.createClass({
  render: function() {
    return (
      <CheckboxWithLabel labelOn="On" labelOff="Off" />
    );
  }
});

var appInstance = <App key="AppKey" />;

React.renderComponent(
  appInstance,
  document.getElementById('content')
);
