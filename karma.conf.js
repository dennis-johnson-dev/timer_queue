module.exports = function(config) {
  config.set({
    basePath: './spec/jasmine/',
    browsers: [

      'Chrome'
    ],
    files: [
      {
        pattern: 'tests.bundle.js',
        watched: false,
      },
    ],
    frameworks: [
      'jasmine',
    ],
    preprocessors: {
      'tests.bundle.js': [
        'webpack',
        'sourcemap'
      ],
    },
    reporters: [
      'dots',
    ],
    webpack: {
      module: {
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
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
