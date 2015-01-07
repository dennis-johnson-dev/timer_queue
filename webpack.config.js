var webpack = require('webpack');

module.exports =  {
  entry: [ 
    'webpack-dev-server/client?http://localhost:3001', 'webpack/dev-server', './app/src/App.js'
  ],
  module: {
    loaders: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', '6to5-loader?&runtime=true'] 
      }
    ]
  },
  output: {
    path: 'public/js',
    filename: 'App.js', 
    publicPath: 'http://localhost:3001/js/'
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      to5Runtime: "imports?global=>{}!exports-loader?global.to5Runtime!6to5/runtime"
    })
  ]
};

