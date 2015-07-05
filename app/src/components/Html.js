const React = require('react');
const Junk = require('./Junk');

class Html extends React.Component {
  constructor(options) {
    super(options);
  }

  render() {
    return (
      <html lang="en">
        <head>
          <title>Timer Queue</title>
            <link rel="stylesheet" href="/vendor/bootstrap.min.css" />
            <link rel="stylesheet" href="/js/styles.css" />
        </head>
        <body>
        <div id="site" dangerouslySetInnerHTML={{__html: this.props.markup}}/>
          <script src="vendor/browser-polyfill.js"></script>
          <script src="bower_components/react/react-with-addons.js"></script>
          <script src="http://localhost:3001/webpack-dev-server.js"></script>
          <script dangerouslySetInnerHTML={{__html: this.props.storeState }} />
          <script src="http://localhost:3001/js/App.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = Html;
