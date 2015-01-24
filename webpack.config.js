var webpack = require('webpack');

var runtime = new webpack.ProvidePlugin({
  to5Runtime: "imports?global=>{}!exports?global.to5Runtime!6to5/runtime"
});

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
        loader: '6to5-loader?runtime'
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
    runtime
  ],
  devServer: {
    stats: {
      colors: true
    }
  },
  devtool: '#inline-source-map'
};

