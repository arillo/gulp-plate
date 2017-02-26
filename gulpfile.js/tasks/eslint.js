const gulp        = require('gulp');
const eslint      = require('gulp-eslint');
const config      = require('../config').eslint;

gulp.task('eslint', () => {
  return gulp.src(config.src)
    .pipe(eslint(config.options))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
