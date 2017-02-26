const gulp              = require('gulp');
const webpack           = require('webpack');
const getWebpackConfig  = require('../util/getWebpackConfig');

gulp.task('js:prod', (cb) => {
  const config = getWebpackConfig('production');

  webpack(config, (err, stats) => {
    // console.log(err);
    // console.log(stats);
    cb();
  });
});

