var gulp = require('gulp');
var react = require('gulp-react');
var browserify = require('gulp-browserify');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var del = require('del');

gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['public/js/app'], cb);
});

gulp.task('default', ['clean', 'build']);

gulp.task('build', function() {
  return gulp.src('app/src/**/*.js', { read: false })
    .pipe(browserify({
      transform: ['reactify'],
      extensions: ['.js']
    }))
    .pipe(gulp.dest('public/js/app/src/'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('app/src/**', ['build']).on('change', livereload.changed);
});