'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

// Run this to compress all the things!
gulp.task('production', function(){
  runSequence('default', ['minifyCss', 'uglifyJs', 'minifyHtml'], 'size-report');
});
