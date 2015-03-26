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
        exclude: /node_modules\/(?!marty)/,
        loader: 'react-hot!babel-loader?experimental&optional=runtime'
      }
    ]
  },
  externals: {
    'react': 'React', 
    'react/addons': 'React'
  },
  resolve: {
    moduleDirectories: ['node_modules', 'app/src'],
    extensions: ['', '.js']
  },
  plugins: [],
  devtool: '#inline-source-map'
};

