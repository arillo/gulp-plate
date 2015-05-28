'use strict';

var gulp = require('gulp');
var del = require('del');
var config   = require('../config');

gulp.task('clean', function(cb){
  del(config.destFolder, {dot: true, force: true}, cb);
});