const gulp       = require('gulp');
const config     = require('../config').production;
const htmlmin    = require('gulp-htmlmin');

gulp.task('minifyHtml', () => {
  return gulp.src(config.htmlSrc)
    .pipe(htmlmin(config.htmlminOpts))
    .pipe(gulp.dest(config.htmlDest));
});
