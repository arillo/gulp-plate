/* eslint import/no-extraneous-dependencies: 0 */

const config    = require('../config').webpack;
const webpack   = require('webpack');

module.exports = (env) => {
  if (env === 'build') {
    config.devtool = 'inline-source-map';
  }

  if (env === 'watch') {
    config.devtool = 'inline-source-map';

    Object.keys(config.entry).forEach((key) => {
      const entry = config.entry[key];
      config.entry[key] = ['webpack-hot-middleware/client?&reload=true'].concat(entry);
    });

    config.plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  if (env === 'prod') {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  return config;
};
