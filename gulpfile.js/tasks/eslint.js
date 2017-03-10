/* eslint import/no-extraneous-dependencies: 0, arrow-body-style: 0 */

const gulp          = require('gulp');
const eslint        = require('gulp-eslint');
const handleErrors  = require('../util/handleErrors');
const config        = require('../config').eslint;

gulp.task('eslint', () => {
  return gulp.src(config.src)
    .pipe(eslint(config.options))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', handleErrors);
});
