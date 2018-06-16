var gulp = require('gulp');

// include plugins
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
  return gulp.src('assets/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/css'));
});

//gulp.task('sass:watch', function () {
  //gulp.watch('assets/sass/*.scss', ['sass']);
//});

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
  console.log('Gulp is running Sass + minifyCSS + minifyJS');
});
