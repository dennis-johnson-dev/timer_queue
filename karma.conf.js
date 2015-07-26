module.exports = function(config) {
  config.set({
    basePath: './spec/jasmine/',
    browsers: [
      'Chrome'
    ],
    files: [
      './tests.bundle.js'
    ],
    frameworks: [
      'jasmine'
    ],
    preprocessors: {
      'tests.bundle.js': [
        'webpack',
        'sourcemap'
      ],
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-html-reporter',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    reporters: [
      'dots'
    ],
    webpack: {
      module: {
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader?stage=1' },
          {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader?sourceMap'
          },
          {
            test: /\.css/,
            loader: 'style-loader!css-loader'
          },
          { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
          { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ],
      },
      devtool: 'inline-source-map'
    },
    webpackServer: {
      noInfo: true,
    },
    singleRun: false
  });
};
