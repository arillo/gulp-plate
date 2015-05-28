/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp     = require('gulp');
var config   = require('../config');
var browserSync   = require('browser-sync');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');


gulp.task('watch', ['clean'], function() {
  runSequence('default', ['watchify','browserSync']);

  watch(config.svgSprite.cwd + '/' + config.svgSprite.src, function(){
    runSequence('sprite', browserSync.reload);
  });

  watch(config.sass.src, function(){
    runSequence('sass');
  });

  watch(config.images.src, function(){
    runSequence('images', browserSync.reload);
  });

  watch([config.markup.src, config.markup.partialsSrc], function(){
    runSequence('markup', browserSync.reload);
  });

  // Watchify will watch and recompile our JS, so no need to gulp.watch it
});
