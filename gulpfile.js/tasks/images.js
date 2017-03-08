/* eslint import/no-extraneous-dependencies: 0, arrow-body-style: 0 */

const changed = require('gulp-changed');
const gulp    = require('gulp');
const svgo    = require('gulp-svgo');
const config  = require('../config').images;

gulp.task('images', () => {
  return gulp.src(config.src)
    .pipe(changed(config.dest))
    .pipe(svgo())
    .pipe(gulp.dest(config.dest));
});
