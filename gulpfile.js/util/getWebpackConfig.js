/* eslint import/no-extraneous-dependencies: 0 */

const config    = require('../config').webpack;
const webpack   = require('webpack');
const path      = require('path');

const src   = path.resolve(__dirname, `../../${config.src}/${config.srcFolder}`);
const dest  = path.resolve(__dirname, `../../${config.dest}/${config.destFolder}`);

const wpConfig = {
  plugins: config.plugins || [],
  context: src,
  entry: config.entry,
  extensions: ['', '.js']
  output: {
    filename: '[name].js',
    path: dest,
    publicPath: `/${config.destFolder}`,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};

module.exports = (env) => {
  if (env === 'build') {
    wpConfig.devtool = 'inline-source-map';
  }

  if (env === 'watch') {
    wpConfig.devtool = 'inline-source-map';

    Object.keys(wpConfig.entry).forEach((key) => {
      const entry = wpConfig.entry[key];
      wpConfig.entry[key] = ['webpack-hot-middleware/client?&reload=true'].concat(entry);
    });

    wpConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  if (env === 'prod') {
    wpConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  return wpConfig;
};
