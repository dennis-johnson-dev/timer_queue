var webpack = require('webpack');

var uglify = new webpack.optimize.UglifyJsPlugin({ 
  compress: {
    warnings: false
  },
  minimize: true,
});

var runtime = new webpack.ProvidePlugin({
  to5Runtime: "imports?global=>{}!exports?global.to5Runtime!6to5/runtime"
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
          loader: '6to5-loader?runtime'
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
    config.plugins.push(runtime);
    config.plugins.push(uglify);
  }

  return config;
};
