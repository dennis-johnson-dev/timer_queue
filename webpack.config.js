var webpack = require('webpack');

module.exports =  {
  entry: {
    App: ['webpack/hot/dev-server', './app/src/App.js']
  },
  module: {
    loaders: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['6to5-loader?experimental=true&runtime=true'] 
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
    new webpack.ProvidePlugin({
    to5Runtime: "imports?global=>{}!exports-loader?global.to5Runtime!6to5/runtime"
  })
  ]
};

