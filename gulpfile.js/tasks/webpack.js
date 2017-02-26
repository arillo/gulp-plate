const gulp              = require('gulp');
const webpack           = require('webpack');
const getWebpackConfig  = require('../util/getWebpackConfig');

gulp.task('js:prod', (cb) => {
  webpack(getWebpackConfig('production'), () => {
    cb();
  });
});

