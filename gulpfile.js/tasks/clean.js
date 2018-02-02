const gulp = require('gulp');
const del = require('del');
const dest = require('../config').dest;

gulp.task('clean', callback => {
  del(dest, { dot: true, force: true }).then(() => {
    callback();
  });
});
