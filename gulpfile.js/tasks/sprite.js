'use strict';

var gulp          = require('gulp');
var svgSprite     = require('gulp-svg-sprite');
var del           = require('del');
var config        = require('../config').svgSprite;
var plumber       = require('gulp-plumber');
var handleErrors  = require('../util/handleErrors');


var spriteTemplate = config.type === 'symbol' ? config.templateSymbol : config.templateCss;

var spriteOptions = {
  mode: {
    [config.type]: {
      layout: 'horizontal',
      sprite: config.spriteImgName,
      dest: '.',
      render: {
        scss: {
          template: spriteTemplate,
          dest: config.sassDest
        }
      }
    }
  },
  variables: config.templateVars
};

// Clean
gulp.task('sprite:clean', function(cb){
  del([config.dest + '/images/sprite*.svg'], {dot: true}).then(paths => {
    cb();
  });
});

gulp.task('sprite', ['sprite:clean'], function (cb) {
  return gulp.src(config.glob, {cwd: config.src})
    .pipe(plumber())
    .pipe(svgSprite(spriteOptions))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});
