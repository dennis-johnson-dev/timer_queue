var webpack = require('webpack');

module.exports =  {
  entry: {
    App: ['webpack/hot/dev-server', './app/src/App.js']
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loaders: ["jsx?harmony"] 
      }
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

