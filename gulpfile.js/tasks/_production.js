/* eslint import/no-extraneous-dependencies: 0 */

const gulp        = require('gulp');
const runSequence = require('run-sequence');

gulp.task('production', (callback) => {
  global.env = 'prod';

  const tasks = [
    'default',
    ['webpack', 'minifyCss', 'minifyHtml'],
    'size-report',
  ];

  runSequence(...tasks, callback);
});
