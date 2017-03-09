/* eslint import/no-extraneous-dependencies: 0 */

const gulp        = require('gulp');
const runSequence = require('run-sequence');

gulp.task('production', (callback) => {
  global.env = 'prod';
  runSequence('default', 'webpack', 'report', callback);
});
