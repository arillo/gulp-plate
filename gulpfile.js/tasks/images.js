const changed = require('gulp-changed');
const { src, dest } = require('gulp');
const svgo = require('gulp-svgo');
const config = require('../config').images;

function images() {
  return src(config.src)
    .pipe(changed(config.dest))
    .pipe(svgo({ plugins: [{ removeViewBox: false }, { cleanupIDs: false }] }))
    .pipe(dest(config.dest));
}

module.exports = images;
