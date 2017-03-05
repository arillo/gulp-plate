/* eslint import/no-extraneous-dependencies: 0, arrow-body-style: 0 */

const config      = require('../config').production;
const gulp        = require('gulp');
const sizereport  = require('gulp-sizereport');

gulp.task('size-report', () => {
  return gulp.src(config.reportSrc)
    .pipe(sizereport({
      gzip: true,
    }));
});
