var webpack = require('webpack');

var uglify = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  minimize: true,
});

module.exports = function(profile) {
  var config = {
    entry: {
      App: ['./app/src/index.js']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!marty)/,
          loader: 'babel-loader?experimental&optional[]=runtime'
        }
      ]
    },
    output: {
      path: 'public/js',
      filename: '[name].js',
      publicPath: 'js'
    },
    externals: {
      'react': 'React',
      'react/addons': 'React'
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
