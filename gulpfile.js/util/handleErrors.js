// const notify = require('gulp-notify');

// module.exports = (errorObject) => {
//   notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);
//   // Keep gulp from hanging on this task
//   if (typeof this.emit === 'function') { this.emit('end'); }
// };


const notify = require('gulp-notify');

module.exports = () => {

  const args = Array.prototype.slice.call(arguments);

  // console.log(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>',
  }).apply(this, args);

  // Keep gulp from hanging on this task
  if (typeof this.emit === 'function') { this.emit('end'); }
  // this.emit('end');
};
