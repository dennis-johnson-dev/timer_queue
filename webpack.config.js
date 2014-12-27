var webpack = require('webpack');

var uglify = 
  new webpack.optimize.UglifyJsPlugin({ minimize: true });

module.exports =  {
  entry: {
    App: ['webpack/hot/dev-server', './app/src/App.js'],
    AppAPI: ['./app/src/api/AppAPI.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "jsx" }
    ]
  },
  output: {
    path: 'public/js',
    filename: '[name].js', 
    publicPath: 'http://localhost:3001/js'
  },
  externals: {
    'react': 'React', 
    'react/addons': 'React',
    'react-router': 'ReactRouter'
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
  ]
};

