/* eslint no-sync: 0 */

const browserSync = require('browser-sync');
const gulp        = require('gulp');
const bsConfig    = require('../config').browserSync;
const wpConfig    = require('../config').webpack;

const webpack     = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

wpConfig.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];

const compiler = webpack(wpConfig);

bsConfig.middleware = [
  webpackDevMiddleware(compiler, {
    publicPath: wpConfig.output.publicPath,
    stats: {
      colors: true,
    },
  }),
  webpackHotMiddleware(compiler),
];

console.log(bsConfig);

gulp.task('browserSync', () => {
  browserSync.init(bsConfig);
});


// if(global.production) return

// var browserSync       = require('browser-sync')
// var gulp              = require('gulp')
// var webpackMultiConfig = require('../lib/webpack-multi-config')
// var config            = require('../config')
// var pathToUrl         = require('../lib/pathToUrl')

// var browserSyncTask = function() {

//   var webpackConfig = webpackMultiConfig('development')
//   var compiler = webpack(webpackConfig)
//   var proxyConfig = config.tasks.browserSync.proxy || null;

//   if (typeof(proxyConfig) === 'string') {
//     config.tasks.browserSync.proxy = {
//       target : proxyConfig
//     }
//   }

//   var server = config.tasks.browserSync.proxy || config.tasks.browserSync.server;

//   server.middleware = [
//     require('webpack-dev-middleware')(compiler, {
//       stats: 'errors-only',
//       publicPath: pathToUrl('/', webpackConfig.output.publicPath)
//     }),
//     require('webpack-hot-middleware')(compiler)
//   ]

//   browserSync.init(config.tasks.browserSync)
// }

// gulp.task('browserSync', browserSyncTask)
// module.exports = browserSyncTask
