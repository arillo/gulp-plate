/* eslint import/no-extraneous-dependencies: 0, arrow-body-style: 0 */

const config      = require('../config');
const gulp        = require('gulp');
const sizereport  = require('gulp-sizereport');


gulp.task('report', () => {
  let src = config.report.src;

  if (config.move.length) {
    config.move.forEach(el => src.push(el.dest));
  }

  src = src.map(el => `${el}/**/*`);

  return gulp.src(src)
    .pipe(sizereport({ gzip: true }));
});
