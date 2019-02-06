const { series, parallel, watch } = require('gulp');
const bs = require('browser-sync');

const config = require('./config');

const clean = require('./tasks/clean');
const sprite = require('./tasks/sprite');
const scss = require('./tasks/scss');
const html = require('./tasks/html');
const images = require('./tasks/images');
const assets = require('./tasks/assets');
const report = require('./tasks/report');
const webpack = require('./tasks/webpack');
const browserSync = require('./tasks/browserSync');

const tasks = [scss, html, images, assets];

function setBuild(cb) {
  global.env = 'build';
  cb();
}

function setProd(cb) {
  global.env = 'prod';
  cb();
}

function reload(cb) {
  bs.reload();
  cb();
}

function watchFiles(cb) {
  global.env = 'watch';

  watch(config.sprite.src, series(sprite, reload));
  watch(config.scss.src, scss);
  watch(config.images.src, series(images, reload));
  watch(config.html.src, series(html, reload));
  cb();
}

const _default = series(clean, setBuild, sprite, parallel(...tasks, webpack));
const _prod = series(
  clean,
  setProd,
  sprite,
  parallel(...tasks, webpack),
  report
);
const _watch = series(
  clean,
  watchFiles,
  sprite,
  parallel(...tasks),
  browserSync
);

module.exports = {
  default: _default,
  production: _prod,
  watch: _watch,
};
