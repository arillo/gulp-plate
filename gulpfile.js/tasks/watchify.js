const gulp           = require('gulp');
const browserifyTask = require('./browserify');

gulp.task('watchify', () => {
  // Start browserify task with devMode === true
  return browserifyTask(true);
});
