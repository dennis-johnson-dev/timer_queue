config =
  react:
    bundle:
      files:
        'app/gen/bundle.js': [
          'app/src/checkbox.jsx',
          'app/src/countdown.jsx',
          'app/src/app.jsx'
        ]
    components:
      files:
        'app/gen/checkbox.js': 'app/src/checkbox.jsx'
    spec:
      files:
        'spec/gen/server-spec.js': 'spec/server/server-spec.jsx'

  browserify:
    app:
      expand: true
      cwd: './'
      src: ['./app/gen/*.js', './spec/gen/*.js']
      dest: './public/js'
      ext: '.js'
      watch: true

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
    server:
      files: ['server/**/*.coffee'],
      tasks: ['coffee']
    react:
      files: ['app/src/*.jsx'],
      tasks: ['react:bundle', 'react:components', 'browserify']
    test:
      files: ['spec/server/*.jsx'],
      tasks: ['react:spec', 'browserify']

module.exports = (grunt) ->

  require('load-grunt-tasks')(grunt)

  grunt.initConfig(config)

  grunt.registerTask('default', ['coffee', 'clean', 'react', 'browserify'])
  grunt.registerTask('start', ['default', 'concurrent'])
  grunt.registerTask('test', ['react', 'watch'])
