webpack = require('webpack')
webpackconfig = require('./webpack.config.js')

config =
  webpack:
    build: webpackconfig

  browserify:
    options:
      transform: [ require('grunt-react').browserify ]
    app:
      expand: true
      cwd: './'
      src: ['./app/src/**/*.js']
      dest: './public/js'
      ext: '.js'

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
      livereload: true
    app:
      files: ['app/src/**/*.js'],
      tasks: ['webpack']
    server:
      files: ['server/**/*.coffee'],
      tasks: ['coffee']

module.exports = (grunt) ->

  require('load-grunt-tasks')(grunt)

  grunt.initConfig(config)

  grunt.registerTask('default', ['coffee', 'clean', 'webpack'])
  grunt.registerTask('test', ['watch'])
