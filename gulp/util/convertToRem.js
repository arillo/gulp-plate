'use strict';

// Template helper to convert pixel values to rem.

// Very specific to this project,
// it asumes that the rem base is 10.

module.exports = function() {
  return function(pos, render) {
    var num = parseInt(render(pos)) / 10;
    if (num === 0) {
      return '0';
    } else {
      return num + 'rem';
    }
  }
};