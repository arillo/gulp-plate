const browserSync = require('browser-sync');
const config = require('../config').browserSync;
const webpack = require('webpack');
const getWebpackConfig = require('../util/getWebpackConfig');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

function browserSyncTask(done) {
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
  done();
}

module.exports = browserSyncTask;
