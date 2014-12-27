webpack = require('webpack')

config =
  webpack:
    build: require('./grunt_webpack.config.js')("min")
    dev: require('./grunt_webpack.config.js')("dev")

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
  grunt.registerTask('build', ['server', 'webpack:build'])
  grunt.registerTask('server', ['coffee', 'clean'])
  grunt.registerTask('test', ['watch'])
