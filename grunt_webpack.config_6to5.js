var webpack = require('webpack');

var uglify = new webpack.optimize.UglifyJsPlugin({ 
  minimize: true 
});

var es6 = new webpack.ProvidePlugin({
  to5Runtime: "imports?global=>{}!exports-loader?global.to5Runtime!6to5/runtime"
});

module.exports = function(profile) {
  var config = {
    entry: {
      App: ['./app/src/App.js']
    },
    module: {
      loaders: [
        { 
          test: /\.js$/,
          exclude: /node_modules/,
          loader: '6to5-loader?experimental=true&runtime=true' 
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
    config.plugins.push(es6);
  }

  return config;
};
