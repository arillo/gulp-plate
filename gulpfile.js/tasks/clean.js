const gulp    = require('gulp');
const del     = require('del');
const config  = require('../config');

gulp.task('clean', (cb) => {
  del(config.destFolder, { dot: true, force: true })
    .then(() => {
      cb();
    });
});
