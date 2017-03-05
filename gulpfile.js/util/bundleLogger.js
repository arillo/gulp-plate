/* eslint import/no-extraneous-dependencies: 0 */

const gutil        = require('gulp-util');
const prettifyTime = require('./prettifyTime');

module.exports = (err, stats) => {
  if (err) { throw new gutil.PluginError('webpack', err); }

  let statColor = stats.compilation.warnings.length < 1 ? 'green' : 'yellow';

  if (stats.compilation.errors.length > 0) {
    statColor = 'red';
    gutil.log(gutil.colors[statColor](stats));
  } else {
    const compileTime = prettifyTime(stats.endTime - stats.startTime);
    gutil.log(gutil.colors[statColor](stats));
    gutil.log('Compiled with', gutil.colors.cyan('webpack'), 'in', gutil.colors.magenta(compileTime));
  }
};
