const config = require('../config');
const { src } = require('gulp');
const sizereport = require('gulp-sizereport');

function report() {
  let srcs = config.report.src;

  if (config.assets && config.assets.length) {
    config.assets.forEach(el => srcs.push(el.dest));
  }

  srcs = srcs.map(el => `${el}/**/*`);

  return src(srcs).pipe(sizereport({ gzip: true }));
}

module.exports = report;
