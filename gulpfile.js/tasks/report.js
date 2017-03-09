/* eslint import/no-extraneous-dependencies: 0, arrow-body-style: 0 */

const config      = require('../config');
const gulp        = require('gulp');
const sizereport  = require('gulp-sizereport');

const src = config.src;

gulp.task('report', () => {
  if (config.move.length) {
    config.move.forEach((el) => src.push(el.dest));
  }

  return gulp.src(src)
    .pipe(sizereport({ gzip: true }));
});
