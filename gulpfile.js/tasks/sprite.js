const svgSymbols = require('gulp-svg-symbols');
const gulp = require('gulp');
const config = require('../config').sprite;
const handleErrors = require('../util/handleErrors');
const rename = require('gulp-rename');
const svgo = require('gulp-svgo');

gulp.task('sprite:data', () => {
  return gulp
    .src(config.src)
    .pipe(svgSymbols({ templates: [config.template] }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.sassDest));
});

gulp.task('sprite', ['sprite:data'], () => {
  return gulp
    .src(config.src)
    .pipe(svgSymbols({ templates: ['default-svg'] }))
    .on('error', handleErrors)
    .pipe(rename(config.spriteName))
    .pipe(svgo({ plugins: [{ removeViewBox: false }, { cleanupIDs: false }] }))
    .pipe(gulp.dest(config.dest));
});
