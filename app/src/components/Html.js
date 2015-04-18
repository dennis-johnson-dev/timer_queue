var React = require('react');
var App = require('../App.js');
var Immutable = require('immutable');

class Html extends React.Component {
  constructor(options) {
    super(options);
    this.id = this.displayName = 'Site';
  }

  render() {
    const { state, markup, script, css, lang } = this.props;
      return (
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
            <title>{ DocumentTitle.rewind() }</title>
            { css.map((href, k) =>
              <link key={k} rel="stylesheet" type="text/css" href={href} />)
            }

            { trackingId &&
              <script dangerouslySetInnerHTML={{__html: ga.replace("{trackingId}", trackingId)}} />
            }

          </head>

          <body>
            <div id="root" dangerouslySetInnerHTML={{__html: markup}} />

            <script dangerouslySetInnerHTML={{__html: state}} />

            { script.map((src, k) => <script key={k} src={src} />) }

          </body>
        </html>
      );
    }
}

module.exports = Html;
