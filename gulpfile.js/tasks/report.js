const config = require('../config');
const gulp = require('gulp');
const sizereport = require('gulp-sizereport');

gulp.task('report', () => {
  let src = config.report.src;

  if (config.assets && config.assets.length) {
    config.assets.forEach(el => src.push(el.dest));
  }

  src = src.map(el => `${el}/**/*`);

  return gulp.src(src).pipe(sizereport({ gzip: true }));
});
