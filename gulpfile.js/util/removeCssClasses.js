// Post CSS utility to remove css classes
// that come from third party imports.

// Match class name helper
function matchClassnames(selector, classes) {
  if (!classes.length) {
    return false;
  }

  let matches = false;

  classes.forEach((className) => {
    if (selector.indexOf(className) > -1) {
      matches = true;
    }
  });

  return matches;
}


module.exports = (classes) => {
  // Return css process function
  return (css) => {
    css.walkRules((node) => {

      if (matchClassnames(node.selector, classes)) {
        node.remove();
      }
    });
  };
};
