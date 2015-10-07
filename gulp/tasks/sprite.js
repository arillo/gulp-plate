'use strict';

var gulp      = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var del       = require('del');
var config    = require('../config').svgSprite;
var replace   = require('gulp-replace');
var plumber   = require('gulp-plumber');
var gulpif    = require('gulp-if');


// Clean
gulp.task('sprite:clean', function(cb){
  del([config.dest + '/images/sprite-*.svg'], {dot: true}, cb);
});


// Spriting inline method or background method
gulp.task('sprite', ['sprite:clean'], function (cb) {
  if (config.type === 'inline') {
    return gulp.src(config.glob, {cwd: config.src})
      .pipe(plumber())
      .pipe(svgSprite(config.optionsInline))
      .on('error', function(error){ console.log(error); })
      .pipe(gulpif(config.removeFills ,replace(/fill="#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})"/g, '')))
      .pipe(gulp.dest(config.dest));
  } else {
    return gulp.src(config.glob, {cwd: config.src})
      .pipe(plumber())
      .pipe(svgSprite(config.optionsBackground))
      .on('error', function(error){ console.log(error); })
      .pipe(gulp.dest(config.dest));
  }
});
