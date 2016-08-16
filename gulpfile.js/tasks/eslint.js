'use strict';

var gulp        = require('gulp');
var eslint      = require('gulp-eslint');
var config      = require('../config').eslint;

gulp.task('eslint', () => {
  return gulp.src(config.src)
    .pipe(eslint(config.options))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});