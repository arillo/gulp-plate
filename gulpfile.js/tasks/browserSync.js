/* eslint no-sync: 0 */

const browserSync = require('browser-sync');
const gulp        = require('gulp');
const config      = require('../config').browserSync;
const webpack     = require('webpack');
const getWebpackConfig = require('../util/getWebpackConfig');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

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

gulp.task('browserSync', () => {
  browserSync.init(config);
});
