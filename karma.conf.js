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
      'dots',
      'html'
    ],
    webpack: {
      module: {
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader?stage=1' },
          {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader?sourceMap'
          }
        ],
      },
      watch: true,
      devTool: 'inline-source-map'
    },
    webpackServer: {
      noInfo: true,
    },
    singleRun: false
  });
};
