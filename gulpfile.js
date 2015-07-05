var gulp = require('gulp');
var babel = require('gulp-babel');
var watch = require('gulp-watch');

gulp.task('default', function () {
  return gulp.src('./server/src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('./server/dist/'));
});


gulp.task('watch', function() {
  gulp.watch('server/src/*.js', ['default']);
});
