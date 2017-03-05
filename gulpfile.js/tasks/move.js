/* eslint import/no-extraneous-dependencies: 0 */

const gulp          = require('gulp');
const config        = require('../config').move;

gulp.task('move', (cb) => {
  if (config.length <= 0) {
    return cb();
  }

  config.forEach((entry) => {
    gulp.src(entry.src)
      .pipe(gulp.dest(entry.dest));
  });

  return cb();
});
