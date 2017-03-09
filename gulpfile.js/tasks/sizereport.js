/* eslint import/no-extraneous-dependencies: 0, arrow-body-style: 0 */

const config      = require('../config').report;
const gulp        = require('gulp');
const sizereport  = require('gulp-sizereport');

gulp.task('size-report', () => {
  return gulp.src(config.src)
    .pipe(sizereport(config.options));
});
