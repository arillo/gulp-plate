const gulp          = require('gulp');
const eslint        = require('gulp-eslint');
const config        = require('../config').eslint;
const handleErrors  = require('../util/handleErrors');

gulp.task('eslint', () => {
  return gulp.src(config.src)
    .pipe(eslint(config.options))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', handleErrors);
});
