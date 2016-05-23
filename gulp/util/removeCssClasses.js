'use strict';

// Utility to remove certain css classes
// that come from third party css imports

module.exports = function(classes) {

  // Match class name helper
  var matchClassnames = function (selector) {
    if (!classes.length) {
      return;
    }

    var matches = false;

    classes.forEach(function(className){
      if (selector.indexOf(className) > -1) {
        matches = true;
      }
    });

    return matches;
  };

  // Return css process function
  return function(css, opts) {
    css.walkRules(function(node){

      if(matchClassnames(node.selector)) {
        node.remove();
      }
    });
  };
}