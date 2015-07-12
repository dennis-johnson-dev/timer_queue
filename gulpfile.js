var gulp = require('gulp');
var babel = require('gulp-babel');
var watch = require('gulp-watch');

gulp.task('default', function () {
  return gulp.src('./server/src/**/*.js')
  .pipe(babel({ stage: 1, loose: ["es6.classes"] }))
  .pipe(gulp.dest('./server/dist/'));
});


gulp.task('watch', function() {
  gulp.watch('server/src/*.js', ['default']);
});
