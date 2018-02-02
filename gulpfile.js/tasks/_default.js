const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', ['clean'], callback => {
  // Set environment
  global.env = global.env || 'build';

  const tasks = ['sprite', ['sass', 'html', 'images', 'assets']];

  if (global.env === 'build') {
    tasks.push('webpack');
  }

  runSequence(...tasks, callback);
});
