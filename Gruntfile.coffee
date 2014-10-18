config =

  browserify:
    options:
      transform: [ require('grunt-react').browserify ]
    app:
      expand: true
      cwd: './'
      src: ['./spec/app/*.js', './app/src/**/*.js']
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
      tasks: ['browserify']
    server:
      files: ['server/**/*.coffee'],
      tasks: ['coffee']
    test:
      files: ['spec/**/*.js'],
      tasks: ['react:spec', 'browserify']

module.exports = (grunt) ->

  require('load-grunt-tasks')(grunt)

  grunt.initConfig(config)

  grunt.registerTask('default', ['coffee', 'clean', 'browserify'])
  grunt.registerTask('test', ['watch'])
