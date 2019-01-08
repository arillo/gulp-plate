const { src, dest } = require('gulp');
const config = require('../config').assets;

function assets(callback) {
  if (config.length <= 0) {
    return callback();
  }

  config.forEach(entry => {
    src(entry.src).pipe(dest(entry.dest));
  });

  return callback();
}

module.exports = assets;
