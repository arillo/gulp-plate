'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', ['clean'], function(cb){
  runSequence(['sprite', 'images'], ['eslint', 'sasslint', 'sass', 'html', 'move', 'browserify'], cb);
});
