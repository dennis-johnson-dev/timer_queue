webpack = require('webpack')
webpackConfig = require('./webpack.config.js')

config =
  webpack:
    prod: require('./grunt_webpack.config.js')("min")

  "webpack-dev-server":
    server:
      options:
        contentBase: 'public/'
        hot: true
        keepalive: true
        port: 3001
        publicPath: webpackConfig.output.publicPath
        webpack: webpackConfig

  sass:
    dev:
      options:
        sourceMap: true
      src: ['app/css/style.scss']
      dest: 'public/css/style.css'
    prod:
      options:
        outputStyle: 'compressed'
      src: ['app/css/style.scss']
      dest: 'public/css/style.min.css'


  clean:
    public: ['public/js', 'public/css']

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
    sass:
      files: ['app/css/**/*.scss']
      tasks: ['sass:dev']
    server:
      files: ['server/**/*.coffee'],
      tasks: ['coffee']

module.exports = (grunt) ->

  require('load-grunt-tasks')(grunt)

  grunt.initConfig(config)

  grunt.registerTask('default', ['server', 'sass:dev'])
  grunt.registerTask('server', ['coffee', 'clean'])
  grunt.registerTask('build', ['server', 'webpack:prod', 'sass:prod'])
  grunt.registerTask('test', ['watch'])
