// Task for static webpack builds (default & production),
// see `browserSync.js` for live update builds.

const wp = require('webpack');
const getWebpackConfig = require('../util/getWebpackConfig');
const logger = require('../util/bundleLogger');

function webpack(cb) {
  const config = getWebpackConfig(global.env);
  wp(config, (err, stats) => {
    logger(err, stats);
    cb();
  });
}

module.exports = webpack;
