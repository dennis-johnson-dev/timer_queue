config =
  react:
    bundle:
      files:
        'public/js/bundle.js': [
          'app/src/components.jsx',
          'app/src/app.jsx'
        ]
    components:
      files:
        'public/js/components.js': 'app/src/components.jsx'
    spec:
      files:
        'spec/gen/server-spec.js': 'spec/server/server-spec.jsx'

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
      files: ['app/react/src/*.jsx'],
      tasks: ['react:bundle', 'react:components']
    test:
      files: ['spec/server/*.jsx'],
      tasks: ['react:spec']

module.exports = (grunt) ->

  require('load-grunt-tasks')(grunt)

  grunt.initConfig(config)

  grunt.registerTask('default', ['coffee', 'clean', 'react'])
  grunt.registerTask('start', ['default', 'concurrent'])
  grunt.registerTask('test', ['react', 'watch'])
