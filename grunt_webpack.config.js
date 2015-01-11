var webpack = require('webpack');

var uglify = 
  new webpack.optimize.UglifyJsPlugin({ 
    compress: {
      warnings: false
    },
    minimize: true,
  });

module.exports = function(profile) {
  var config = {
    entry: {
      App: ['./app/src/App.js']
    },
    module: {
      loaders: [
        { test: /\.js$/, loader: "jsx?harmony" }
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
