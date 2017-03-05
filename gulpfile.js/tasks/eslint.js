/* eslint import/no-extraneous-dependencies: 0, arrow-body-style: 0 */

const gulp          = require('gulp');
const eslint        = require('gulp-eslint');
const config        = require('../config').eslint;
// const handleErrors  = require('../util/handleErrors');
const gulpif        = require('gulp-if');
// const notify        = require('gulp-notify');

gulp.task('eslint', () => {
  return gulp.src(config.src)
    .pipe(eslint(config.options))
    .pipe(eslint.format())
    // Fail if trying to creat production bundle with errors
    .pipe(gulpif(global.env === 'prod', eslint.failAfterError()));
    // .on('error', handleErrors);
});
