/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   This task is set up to generate multiple separate bundles, from
   different sources, and to use Watchify when run from the default task.

   See browserify.bundleConfigs in gulp/config.js
*/

const browserify   = require('browserify');
const browserSync  = require('browser-sync');
const watchify     = require('watchify');
const mergeStream  = require('merge-stream');
const bundleLogger = require('../util/bundleLogger');
const gulp         = require('gulp');
const handleErrors = require('../util/handleErrors');
const source       = require('vinyl-source-stream');
const config       = require('../config').browserify;
const _            = require('lodash');

function browserifyTask(devMode) {

  function browserifyThis(bundleConfig) {

    if (devMode) {
      // Add watchify args and debug (sourcemaps) option
      _.extend(bundleConfig, watchify.args, { debug: true });
      // A watchify require/external bug that prevents proper recompiling,
      // so (for now) we'll ignore these options during development. Running
      // `gulp browserify` directly will properly require and externalize.
      bundleConfig = _.omit(bundleConfig, ['external', 'require']);
    }

    const b = browserify(bundleConfig);

    function bundle() {
      // Log when bundling starts
      bundleLogger.start(bundleConfig.outputName);

      return b
        .bundle()
        // Report compile errors
        .on('error', handleErrors)
        // Use vinyl-source-stream to make the
        // stream gulp compatible. Specify the
        // desired output filename here.
        .pipe(source(bundleConfig.outputName))
        // Specify the output destination
        .pipe(gulp.dest(bundleConfig.dest))
        .pipe(browserSync.reload({
          stream: true,
        }));
    }

    if (devMode) {
      // Wrap with watchify and rebundle on changes
      b = watchify(b);
      // Rebundle on update
      b.on('update', bundle);
      bundleLogger.watch(bundleConfig.outputName);
    } else {
      // Sort out shared dependencies.
      // b.require exposes modules externally
      if (bundleConfig.require) { b.require(bundleConfig.require); }
      // b.external excludes modules from the bundle, and expects
      // they'll be available externally
      if (bundleConfig.external) { b.external(bundleConfig.external); }
    }

    return bundle();
  }

  // Start bundling with Browserify for each bundleConfig specified
  return mergeStream.apply(gulp, _.map(config.bundleConfigs, browserifyThis));

}

gulp.task('browserify', () => {
  return browserifyTask();
});

// Exporting the task so we can call it directly in our watch task, with the 'devMode' option
module.exports = browserifyTask;
