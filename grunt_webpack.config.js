var webpack = require('webpack');

var uglify = 
  new webpack.optimize.UglifyJsPlugin({ minimize: true });

module.exports = function(profile) {
  var config = {
    entry: {
      App: ['./app/src/App.js'],
      AppAPI: ['./app/src/api/AppAPI.js']
    },
    module: {
      loaders: [
        { test: /\.js$/, loader: "jsx?" }
      ]
    },
    output: {
      path: 'public/js',
      filename: '[name].js',
      publicPath: 'js'
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

  if (profile === "min") {
    config.plugins.push(uglify);
  }

  return config;
};
