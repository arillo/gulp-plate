const del = require('del');
const dest = require('../config').dest;

function clean(callback) {
  del(dest, { dot: true, force: true }).then(() => {
    callback();
  });
}

module.exports = clean;
