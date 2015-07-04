var webpack = require('webpack');

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
        loader: "style!css!sass?sourceMap"
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
  plugins: [],
  devtool: '#inline-source-map'
};
