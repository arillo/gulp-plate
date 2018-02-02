const config = require('../config').html;
const data = require('gulp-data');
const gulp = require('gulp');
const handleErrors = require('../util/handleErrors');
const path = require('path');
const gulpif = require('gulp-if');
const render = require('gulp-nunjucks-render');
const fs = require('fs');
const glob = require('glob');
const htmlmin = require('gulp-htmlmin');

function getData(isProd) {
  const jsonData = { isProd };
  const files = glob.sync(config.data);

  files.forEach(el => {
    const dataPath = path.resolve(el);
    Object.assign(jsonData, JSON.parse(fs.readFileSync(dataPath, 'utf8')));
  });

  return jsonData;
}

const exclude = path.normalize(`!**/{${config.excludeFolders.join(',')}}/**`);
const src = [path.join(config.src, config.glob), exclude];

gulp.task('html', () => {
  const isProd = global.env === 'prod';

  return gulp
    .src(src)
    .pipe(data(getData(isProd)))
    .on('error', handleErrors)
    .pipe(
      render({
        path: config.src,
        envOptions: {
          watch: false,
        },
      })
    )
    .on('error', handleErrors)
    .pipe(gulpif(isProd, htmlmin(config.compression)))
    .pipe(gulp.dest(config.dest));
});
