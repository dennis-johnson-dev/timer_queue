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
        exclude: /node_modules\/(?!marty)/,
        loader: 'react-hot!babel-loader?cacheDirectory&stage=1&optional[]=runtime&loose=es6.classes'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader?sourceMap")
      }
    ]
  },
  externals: {
    'react': 'React',
    'react/addons': 'React'
  },
  resolve: {
    moduleDirectories: ['node_modules', 'app'],
    extensions: ['', '.js']
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ],
  devtool: '#inline-source-map'
};
