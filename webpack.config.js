var webpack = require('webpack');

var commonsPlugin =
  new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  entry: {
    App: './app/src/App.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "jsx" }
    ]
  },
  output: {
    path: 'public/js',
    filename: '[name].js'       
  },
  externals: {
      "React": "React"
  },
  plugins: [commonsPlugin]
};
