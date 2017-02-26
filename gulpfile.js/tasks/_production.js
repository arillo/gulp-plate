const gulp        = require('gulp');
const runSequence = require('run-sequence');

// Run this to compress all the things!
gulp.task('production', () => {
  runSequence(
    'js:prod',
    ['sprite', 'images'],
    ['sasslint', 'sass', 'html', 'move'],
    ['minifyCss', 'minifyHtml'],
    'size-report'
  );
});
