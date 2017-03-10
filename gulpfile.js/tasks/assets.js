/* eslint import/no-extraneous-dependencies: 0 */

const gulp          = require('gulp');
const config        = require('../config').assets;

gulp.task('assets', (callback) => {
  if (config.length <= 0) {
    return callback();
  }

  config.forEach((entry) => {
    gulp.src(entry.src)
      .pipe(gulp.dest(entry.dest));
  });

  return callback();
});
