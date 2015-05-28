'use strict';

var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var del = require('del');
var config  = require('../config').svgSprite;

// Clean
/* jshint ignore:start */
gulp.task('sprite:clean', function(cb){
  del([config.dest + '/images/sprite-*.svg'], {dot: true}, cb);
});
/* jshint ignore:end */

gulp.task('sprite', ['sprite:clean'], function (cb){
  return gulp.src(config.glob, {cwd: config.src})
    .pipe(svgSprite(config.options))
    .on('error', function(error){ console.log(error); })
    .pipe(gulp.dest(config.dest));
});