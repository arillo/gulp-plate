/* eslint no-sync: 0, global-require: 0, import/no-extraneous-dependencies: 0 */

const gulp          = require('gulp');
const config        = require('../config');
const browserSync   = require('browser-sync');
const runSequence   = require('run-sequence');
const watch         = require('gulp-watch');


gulp.task('watch', (callback) => {
  // Set environment
  global.env = 'watch';
  require('./browserSync');

  watch(`${config.sprite.src}/**/*.svg`, () => {
    runSequence('sprite', browserSync.reload);
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

  runSequence('default', 'browserSync', callback);
});
