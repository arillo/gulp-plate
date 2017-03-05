/* eslint no-sync: 0, import/no-extraneous-dependencies: 0 */

// This task is not registered by default to prevent
// webpackDevMiddleware and webpackHotMiddleware be
// executed unless we are using the watch task.

const browserSync = require('browser-sync');
const gulp        = require('gulp');
const config      = require('../config').browserSync;
const webpack     = require('webpack');
const getWebpackConfig = require('../util/getWebpackConfig');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

function browserSyncTask() {
  const wpConfig = getWebpackConfig('watch');
  const bundler = webpack(wpConfig);

  config.middleware = [
    webpackDevMiddleware(bundler, {
      publicPath: wpConfig.output.publicPath,
      stats: 'minimal',
      hot: true,
    }),
    webpackHotMiddleware(bundler),
  ];

  browserSync.init(config);
}

function registerTask() {
  gulp.task('browserSync', browserSyncTask);
}

module.exports = registerTask();
