'use strict';

var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var handleErrors  = require('../util/handleErrors');
var config        = require('../config').sass;
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');
var removeClasses = require('../util/removeCssClasses')(config.remove);

var procesors = [
  removeClasses,
  autoprefixer({ browsers: config.prefix })
];

gulp.task('sass', function () {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(sass(config.settings))
    .on('error', handleErrors)
    .pipe(postcss(procesors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
