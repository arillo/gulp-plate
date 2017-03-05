/* eslint import/no-extraneous-dependencies: 0 */

const gulp    = require('gulp');
const del     = require('del');
const config  = require('../config');

gulp.task('clean', (callback) => {
  del(config.destFolder, { dot: true, force: true })
    .then(() => {
      callback();
    });
});
