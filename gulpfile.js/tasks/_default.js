/* eslint import/no-extraneous-dependencies: 0, arrow-body-style: 0 */

const gulp        = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', ['clean'], (callback) => {
  // Set environment
  global.env = global.env || 'build';

  const tasks = [
    ['sprite', 'images'],
    ['eslint', 'sasslint', 'sass', 'html', 'move'],
  ];

  if (global.env === 'build') {
    tasks.push('webpack');
  }

  runSequence(...tasks, callback);
});
