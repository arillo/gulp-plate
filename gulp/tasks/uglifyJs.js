'use strict';

var gulp    = require('gulp');
var config  = require('../config').production;
var uglify  = require('gulp-uglify');

gulp.task('uglifyJs', function() {
  return gulp.src(config.jsSrc)
    .pipe(uglify())
    .pipe(gulp.dest(config.jsDest));
});
