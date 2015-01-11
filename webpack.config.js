var webpack = require('webpack');

module.exports =  {
  entry: {
    App: ['webpack/hot/dev-server', './app/src/App.js']
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
        exclude: /node_modules/,
        loaders: ['jsx-loader?harmony'] 
      }
    ]
  },
  externals: {
    'react': 'React', 
    'react/addons': 'React',
    'react-router': 'ReactRouter'
  },
  resolve: {
    moduleDirectories: ['node_modules', 'app/src'],
    extensions: ['', '.js']
  },
  plugins: [
  ],
  devServer: {
    stats: {
      colors: true
    }
  },
  devtool: 'inline-source-map'
};

