/* eslint import/no-extraneous-dependencies: 0 */

const gulp          = require('gulp');
const browserSync   = require('browser-sync');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const handleErrors  = require('../util/handleErrors');
const config        = require('../config').sass;
const postcss       = require('gulp-postcss');
const gulpif        = require('gulp-if');
const nano          = require('cssnano');
const autoprefixer  = require('autoprefixer');
const removeClasses = require('../util/removeCssClasses')(config.remove);

const procesors = [
  removeClasses,
  autoprefixer({ browsers: config.prefix }),
];

gulp.task('sass', () => {
  const isProd = global.env === 'prod';

  if (isProd) {
    procesors.push(
      nano(config.compression)
    );
  }

  return gulp.src(config.src)
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass(config.options))
    .on('error', handleErrors)
    .pipe(postcss(procesors))
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(gulp.dest(config.dest))
    .pipe(gulpif(!isProd, browserSync.reload({ stream: true })));
});
