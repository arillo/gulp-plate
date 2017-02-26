/* eslint no-sync: 0 */

const config       = require('../config').html;
const browserSync  = require('browser-sync');
const data         = require('gulp-data');
const gulp         = require('gulp');
const handleErrors = require('../util/handleErrors');
const path         = require('path');
const render       = require('gulp-nunjucks-render');
const fs           = require('fs');
const _            = require('lodash');
const glob         = require('glob');

function getData() {
  const jsonData = {};
  const files = glob.sync(config.data);

  files.forEach((el) => {
    const dataPath = path.resolve(el);
    _.extend(jsonData, JSON.parse(fs.readFileSync(dataPath, 'utf8')));
  });

  return jsonData;
}

const exclude = path.normalize('!**/{' + config.excludeFolders.join(',') + '}/**');
const src = [path.join(config.src, config.glob), exclude];

gulp.task('html', () => {
  return gulp.src(src)
    .pipe(data(getData))
    .on('error', handleErrors)
    .pipe(render({
      path: config.src,
      envOptions: {
        watch: false,
      },
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({ stream: true }));
});
