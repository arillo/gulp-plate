'use strict';

var gulp      = require('gulp');
var config    = require('../config').production;
var postcss   = require('gulp-postcss');
var nano      = require('cssnano');

var procesors = [
  nano(config.cssCompressionOpts)
];

gulp.task('minifyCss', function() {
  return gulp.src(config.cssSrc)
    .pipe(postcss(procesors))
    .pipe(gulp.dest(config.cssDest));
});