/** @jsx React.DOM */


var App = React.createClass({
  render: function() {
    return (
      <div>
        <CountDown total="10" />
      </div>
    );
  }
});

var appInstance = <App key="AppKey" />;

React.renderComponent(
  appInstance,
  document.getElementById('content')
);
