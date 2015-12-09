'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', ['clean'], function(cb){
  runSequence('sprite', ['jshint', 'jscs', 'coffeelint'], ['sass', 'markup', 'browserify'], 'images', cb);
});
