var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports =  {
  entry: {
    App: ['webpack/hot/dev-server', './app/src/index.js']
  },
  output: {
    path: 'public/js',
    filename: '[name].js',
    publicPath: 'http://localhost:3001/js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel-loader?cacheDirectory&stage=1&optional[]=runtime&loose=es6.classes'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader?sourceMap'
      }
    ]
  },
  resolve: {
    moduleDirectories: ['node_modules', 'app'],
    extensions: ['', '.js']
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      process: JSON.stringify({ env: true })
    })
  ],
  devtool: '#inline-source-map'
};
