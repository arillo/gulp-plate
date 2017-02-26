const gulp        = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', ['clean'], (cb) => {
  // console.log(process.env);
  // console.log(NODE_ENV);
  runSequence(['sprite', 'images'], ['eslint', 'sasslint', 'sass', 'html', 'move'], cb);
});
