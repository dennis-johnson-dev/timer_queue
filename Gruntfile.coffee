config =
  react:
   components:
      files: [
        'app/gen/countdown.js': 'app/src/CountDown.js',
        'app/gen/app.js': 'app/src/App.js'
      ]
    spec:
      files: [
        'spec/gen/countdown-spec.js': 'spec/app/countdown-spec.js'
      ]

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

  concurrent:
    target:
      tasks: ['nodemon', 'watch'],
      options:
        logConcurrentOutput: true

  nodemon:
    dev:
      script: 'server/gen/server.js'
      options:
        ignore: ['node_modules/**']

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
# react:
#   files: ['app/src/**/*.js'],
#   tasks: ['react', 'browserify']


module.exports = (grunt) ->

  require('load-grunt-tasks')(grunt)

  grunt.initConfig(config)

  grunt.registerTask('default', ['coffee', 'clean', 'browserify'])
  grunt.registerTask('start', ['default', 'concurrent'])
  grunt.registerTask('test', ['watch'])
