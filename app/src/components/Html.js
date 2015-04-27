var React = require('react');

class Html extends React.Component {
  constructor(options) {
    super(options);
    this.id = this.displayName = 'Html';
  }

  render() {
    return (
      <html lang="en">
        <head>
          <title>Timer Queue</title>
            <link rel="stylesheet" href="/vendor/bootstrap.min.css" />
            <link rel="stylesheet" href="/css/style.css" />
        </head>
        <body>
        <div id="site" dangerouslySetInnerHTML={{__html: this.props.markup}} />
          <script src="vendor/browser-polyfill.js"></script>
          <script src="bower_components/react/react-with-addons.js"></script>
          <script src="http://localhost:3001/js/App.js"></script>
          <script src="http://localhost:3001/webpack-dev-server.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = Html;
