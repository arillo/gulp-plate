// Template helper to convert pixel values to rem.

// Very specific to this project,
// it asumes that the rem base is 10.

module.exports = () => {
  return (pos, render) => {
    const num = parseInt(render(pos), 10) / 10;
    if (num === 0) {
      return '0';
    }

    return `${num}rem`;
  };
};
