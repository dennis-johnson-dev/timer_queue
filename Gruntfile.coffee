webpack = require('webpack')
webpackConfig = require('./webpack.config.js')

config =
  webpack:
    build: require('./grunt_webpack.config_6to5.js')("min")
    dev: require('./grunt_webpack.config.js')("dev")

  webpack_server:
    server:
      options:
        webpack: webpackConfig
        publicPath: "/" + webpackConfig.output.publicPath
        port: 3001
        contentBase: 'public/'
        keepalive: true

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
