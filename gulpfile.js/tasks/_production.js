const gulp        = require('gulp');
const runSequence = require('run-sequence');

gulp.task('production', () => {
  global.env = 'prod';

  runSequence(
    'default',
    ['webpack', 'minifyCss', 'minifyHtml'],
    'size-report'
  );
});
