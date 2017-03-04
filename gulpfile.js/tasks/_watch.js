const gulp          = require('gulp');
const config        = require('../config');
const browserSync   = require('browser-sync');
const runSequence   = require('run-sequence');
const watch         = require('gulp-watch');


gulp.task('watch', () => {
  // Set environment
  global.env = 'watch';
  require('./browserSync');

  runSequence('default', 'browserSync');

  watch(`${config.svgSprite.src}/${config.svgSprite.glob}`, () => {
    runSequence('sprite', browserSync.reload);
  });

  watch(config.eslint.src, () => {
    runSequence('eslint');
  });

  watch(config.sass.src, () => {
    runSequence('sasslint', 'sass');
  });

  watch(config.images.src, () => {
    runSequence('images', browserSync.reload);
  });

  watch(`${config.html.src}/${config.html.glob}`, () => {
    runSequence('html', browserSync.reload);
  });
});
