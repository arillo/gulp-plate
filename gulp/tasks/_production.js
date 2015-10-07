'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

// Run this to compress all the things!
gulp.task('production', function(){
  // This runs only if the karma tests pass
  runSequence('default', ['minifyCss', 'uglifyJs']);
});
