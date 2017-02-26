const config = require('../config').webpack;
const webpack     = require('webpack');
const path          = require('path');

const wpConfig = {
  plugins: config.plugins || [],
  context: path.resolve(__dirname, config.src),
  entry: config.entry,
  output: {
    filename: '[name].js',
    path: '../dist/' + config.destFolder,
    publicPath: '/js/',
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
  if (env === 'watch') {
    wpConfig.devtool = 'inline-source-map';

    for (const key in wpConfig.entry) {
      const entry = wpConfig.entry[key];
      wpConfig.entry[key] = ['webpack-hot-middleware/client?&reload=true'].concat(entry);
    }

    wpConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );

    return wpConfig;
  }

  if (env === 'production') {
    wpConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin
    );

    return wpConfig;
  }

  return wpConfig;
};
