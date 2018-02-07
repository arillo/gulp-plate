const changed = require('gulp-changed');
const gulp = require('gulp');
const svgo = require('gulp-svgo');
const config = require('../config').images;

gulp.task('images', () => {
  return gulp
    .src(config.src)
    .pipe(changed(config.dest))
    .pipe(svgo({ plugins: [{ removeViewBox: false }, { cleanupIDs: false }] }))
    .pipe(gulp.dest(config.dest));
});
