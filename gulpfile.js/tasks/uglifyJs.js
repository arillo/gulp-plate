const gulp    = require('gulp');
const config  = require('../config').production;
const uglify  = require('gulp-uglify');

gulp.task('uglifyJs', () => {
  return gulp.src(config.jsSrc)
    .pipe(uglify())
    .pipe(gulp.dest(config.jsDest));
});
