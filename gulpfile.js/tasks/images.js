const changed = require('gulp-changed');
const gulp = require('gulp');
const svgo = require('gulp-svgo');
const config = require('../config').images;

gulp.task('images', () => {
  return gulp
    .src(config.src)
    .pipe(changed(config.dest))
    .pipe(svgo({ removeViewBox: false, removeDimensions: true }))
    .pipe(gulp.dest(config.dest));
});
