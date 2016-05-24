'use strict';

var config      = require('../config').production
var gulp        = require('gulp')
var sizereport  = require('gulp-sizereport')

gulp.task('size-report', function() {
  return gulp.src(config.reportSrc)
    .pipe(sizereport({
      gzip: true
    }))
});
