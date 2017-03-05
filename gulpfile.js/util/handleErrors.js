/* eslint import/no-extraneous-dependencies: 0 */

// @TODO review this to emit an erorr notification when eslint fails

const notify = require('gulp-notify');

module.exports = () => {
  const args = Array.prototype.slice.call(arguments);

  const notifyOpts = {
    title: 'Compile Error',
    message: '<%= error.message %>',
  };

  if (typeof args.error === 'undefined' || args.error.length <= 0) {
    notifyOpts.message = 'There was an error, check the console';
  }

  notify.onError(notifyOpts).apply(this, args);

  // Keep gulp from hanging on this task
  if (typeof this.emit === 'function') { this.emit('end'); }
};
