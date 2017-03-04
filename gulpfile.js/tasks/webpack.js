const gulp              = require('gulp');
const webpack           = require('webpack');
const getWebpackConfig  = require('../util/getWebpackConfig');

gulp.task('webpackBuild', (cb) => {
  const config = getWebpackConfig(global.env);
  webpack(config, (err, stats) => {
    cb();
  });
});

