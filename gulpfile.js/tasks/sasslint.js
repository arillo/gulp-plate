const gulp          = require('gulp');
const sassLint      = require('gulp-sass-lint');
const config        = require('../config').sass;
const handleErrors  = require('../util/handleErrors');

gulp.task('sasslint', () => {
  return gulp.src(config.src)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .on('error', handleErrors);
});
