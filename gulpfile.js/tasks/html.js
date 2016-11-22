'use strict';

var config       = require('../config').html;
var browserSync  = require('browser-sync');
var data         = require('gulp-data');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var path         = require('path');
var render       = require('gulp-nunjucks-render');
var fs           = require('fs');
var _            = require('lodash');
var glob         = require("glob");

var getData = function() {
  let data = {};

  let files = glob.sync(config.data)
  files.forEach((el) => {
    const dataPath = path.resolve(el);
    _.extend(data, JSON.parse(fs.readFileSync(dataPath, 'utf8')))
  });

  return data;
}

var exclude = path.normalize('!**/{' + config.excludeFolders.join(',') + '}/**');
var src = [path.join(config.src, config.glob), exclude];

gulp.task('html', function() {
  return gulp.src(src)
    .pipe(data(getData))
    .on('error', handleErrors)
    .pipe(render({
      path: config.src,
      envOptions: {
        watch: false
      }
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
