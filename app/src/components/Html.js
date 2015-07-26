const React = require('react');

class Html extends React.Component {
  constructor(options) {
    super(options);
  }

  render() {
    let appUrl;
    let devScripts;
    let reactScript;
    if (process.env.DEV) {
      appUrl = "http://localhost:3001/js/App.js";
      devScripts = <script src="http://localhost:3001/webpack-dev-server.js"></script>;
    } else {
      reactScript = <script src="bower_components/react/react-with-addons.min.js"></script>;
      appUrl = "/js/App.js";
    }
    return (
      <html lang="en">
        <head>
          <title>Timer Queue</title>
            <link rel="stylesheet" href="/vendor/bootstrap.min.css" />
            <link rel="stylesheet" href="/js/styles.css" />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        </head>
        <body>
        <div id="site" dangerouslySetInnerHTML={{__html: this.props.markup}} />
          <script src="/vendor/browser-polyfill.js"></script>
          { reactScript }
          { devScripts }
          <script dangerouslySetInnerHTML={{__html: this.props.storeState }} />
          <script src={ appUrl }></script>
        </body>
      </html>
    );
  }
}

module.exports = Html;
