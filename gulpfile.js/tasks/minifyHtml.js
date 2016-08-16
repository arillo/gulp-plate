'use strict';

var gulp       = require('gulp');
var config     = require('../config').production;
var htmlmin    = require('gulp-htmlmin')

gulp.task('minifyHtml', function() {
  return gulp.src(config.htmlSrc)
    .pipe(htmlmin(config.htmlminOpts))
    .pipe(gulp.dest(config.htmlDest));
});
