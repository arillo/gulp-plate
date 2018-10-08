const notify = require('gulp-notify');
const log = require('fancy-log');
const beep = require('beeper');
const colors = require('ansi-colors');

// Taken from here https://github.com/mikaelbr/gulp-notify/issues/81#issuecomment-268852774

function reportError(error) {
  // Console error
  let report = '\n';
  const chalk = colors.red.bold;
  let notifyMessage = '';

  if (error.plugin) {
    report += `${chalk('PLUGIN:')} [' ${error.plugin} ']\n`;
  }

  if (error.message) {
    report += `${chalk('ERROR:')} ${error.message}\n`;
  }

  if (!error.message) {
    report += `${chalk('ERROR:')} ${error.toString()}\n`;
  }

  log(colors.red(report));

  // Notification
  if (error.line && error.column) {
    notifyMessage += `LINE ${error.line}:${error.column} -- `;
  }

  if (error.file) {
    notifyMessage += `FILE ${error.file}`;
  }

  notify({
    title: `FAIL: ${error.plugin}`,
    message: `${notifyMessage} See console.`,
    sound: false,
  }).write(error);

  // System beep
  if (global.env !== 'watch') {
    beep();
  }

  if (typeof this.emit === 'function') {
    this.emit('end');
  }
}

module.exports = reportError;
