/* eslint import/no-extraneous-dependencies: 0, arrow-body-style: 0 */

const gulp          = require('gulp');
const svgSprite     = require('gulp-svg-sprite');
const del           = require('del');
const config        = require('../config').sprite;
const plumber       = require('gulp-plumber');
const handleErrors  = require('../util/handleErrors');


const spriteTemplate = config.type === 'symbol' ? config.templateSymbol : config.templateCss;

const spriteOptions = {
  mode: {
    [config.type]: {
      layout: 'horizontal',
      sprite: config.spriteImgName,
      dest: '.',
      render: {
        scss: {
          template: spriteTemplate,
          dest: config.sassDest,
        },
      },
    },
  },
  variables: config.templateVars,
};

// Clean
gulp.task('sprite:clean', (cb) => {
  del([`${config.dest}/images/sprite*.svg`], { dot: true })
    .then(() => {
      cb();
    });
});

gulp.task('sprite', ['sprite:clean'], () => {
  return gulp.src('**/*.svg', { cwd: config.src })
    .pipe(plumber())
    .pipe(svgSprite(spriteOptions))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});
