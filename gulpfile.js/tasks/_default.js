const gulp        = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', ['clean'], (cb) => {
  runSequence(['sprite', 'images'], ['eslint', 'sasslint', 'sass', 'html', 'move'], cb);
});
