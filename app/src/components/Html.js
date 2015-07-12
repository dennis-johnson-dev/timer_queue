const React = require('react');

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
        <div id="site" dangerouslySetInnerHTML={{__html: this.props.markup}} />
          <script src="vendor/browser-polyfill.js"></script>
          <script src="bower_components/react/react-with-addons.js"></script>
          <script dangerouslySetInnerHTML={{__html: this.props.storeState }} />
          <script src="/js/App.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = Html;
