var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var del = require('del');
var config  = require('../config').svgSprite;
var dest  = require('../config').destFolder;
var handleErrors = require('../util/handleErrors');

// Clean
gulp.task('sprite:clean', function(cb){
  del([config.dest + '/src/images/sprite-*.svg'], {dot: true}, cb);
});

// gulp.task('sprite:cleanDest', function(cb){
//   del([config.dest + '/images/sprite-*.svg'], {dot: true, force: true}, cb);
// });

gulp.task('sprite', ['sprite:clean'], function (cb){
  return gulp.src(config.src, {cwd: config.cwd})
    .pipe(svgSprite(config.options))
    .on('error', function(error){ console.log(error); })
    .pipe(gulp.dest(config.dest));
});
