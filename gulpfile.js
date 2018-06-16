var gulp = require('gulp');

// include plugins
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('minifyCSS', function() {
  gulp.src('assets/css/main.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('minifyJS', function() {
  gulp.src('assets/js/main.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('default', function() {
  console.log('Gulp is running minifyCSS & minifyJS');
});
