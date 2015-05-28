'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');

gulp.task('default', ['clean'], function(cb){
  runSequence('sprite', ['sass', 'markup', 'browserify'], 'images', cb);
});
