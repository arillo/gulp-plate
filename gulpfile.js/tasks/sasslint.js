const gulp      = require('gulp');
const sassLint  = require('gulp-sass-lint');
const config    = require('../config').sass;

gulp.task('sasslint', () => {
  return gulp.src(config.src)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});
