const config = require('../config').webpack;
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
  if (!config.plugins) {
    config.plugins = [];
  }

  if (env === 'build') {
    config.devtool = 'inline-source-map';
    config.mode = 'development';
  }

  if (env === 'watch') {
    config.devtool = 'inline-source-map';
    config.mode = 'development';

    Object.keys(config.entry).forEach(key => {
      const entry = config.entry[key];
      config.entry[key] = ['webpack-hot-middleware/client?&reload=true'].concat(
        entry
      );
    });

    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (env === 'prod') {
    config.mode = 'production';
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new UglifyJSPlugin()
    );
  }

  return config;
};
