// Task for static webpack builds (default & production),
// see `browserSync.js` for live update builds.

const gulp = require('gulp');
const webpack = require('webpack');
const getWebpackConfig = require('../util/getWebpackConfig');
const logger = require('../util/bundleLogger');

gulp.task('webpack', cb => {
  const config = getWebpackConfig(global.env);
  webpack(config, (err, stats) => {
    logger(err, stats);
    cb();
  });
});
