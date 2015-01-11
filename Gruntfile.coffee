webpack = require('webpack')
webpackConfig = require('./webpack.config.js')

config =
  webpack:
    build: require('./grunt_webpack.config.js')("min")
    dev: require('./grunt_webpack.config.js')("dev")

  "webpack-dev-server":
    server:
      options:
        contentBase: 'public/'
        hot: true
        keepalive: true
        port: 3001
        publicPath: webpackConfig.output.publicPath
        webpack: webpackConfig

  clean:
    public: ['public/js']

  coffee:
    server:
      expand: true,
      cwd: 'server/src',
      src: ['**/*.coffee'],
      dest: 'server/gen/',
      ext: '.js'

  watch:
    options:
      livereload: false
    app:
      files: ['app/src/**/*.js'],
      tasks: ['webpack:dev']
    server:
      files: ['server/**/*.coffee'],
      tasks: ['coffee']

module.exports = (grunt) ->

  require('load-grunt-tasks')(grunt)

  grunt.initConfig(config)

  grunt.registerTask('default', ['server', 'webpack:dev'])
  grunt.registerTask('server', ['coffee', 'clean'])
  grunt.registerTask('build', ['server', 'webpack:build'])
  grunt.registerTask('test', ['watch'])
