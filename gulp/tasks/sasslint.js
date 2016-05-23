'use strict';

var gulp         = require('gulp');
var sassLint     = require('gulp-sass-lint');
var config       = require('../config').sass;

gulp.task('sasslint', function () {
  return gulp.src(config.src)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});
