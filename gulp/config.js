'use strict';

var path = require('path');
var gulp = require('gulp');

function distName() {
  var folder = path.dirname(__dirname);
  folder = path.basename(folder);
  return folder.replace('_source', '');
}

var folderName = distName()
var dest = "./dist";
var src = './src';


module.exports = {
  destFolder: dest,

  browserSync: {
    notify: false,
    port: 9000,
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },

  sass: {
    src: src + "/sass/**/*.{sass,scss}",
    dest: dest + '/css',
    prefix: [
      'ie >= 9',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ],
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
      imagePath: 'images' // Used by the image-url helper
    }
  },

  images: {
    src: src + "/images/**",
    dest: dest + "/images"
  },

  markup: {
    partialsSrc: src + '/html/partials/**',
    src: src + "/html/*.tpl.html",
    dest: dest + "/"
  },

  jslint: {
    srcJs: src + '/js/**/*.js',
    srcCoffee: src + '/js/**/*.coffee'
  },

  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/js/main.coffee',
      dest: dest + '/js',
      outputName: 'main.js',
      // Additional file extentions to make optional
      extensions: ['.coffee'],
      // list of modules to make require-able externally
      require: ['jquery']
      // old: require: ['jquery', 'backbone/node_modules/underscore']
      // See https://github.com/greypants/gulp-starter/issues/87 for note about
      // why this is 'backbone/node_modules/underscore' and not 'underscore'
    // }, {
    //   entries: src + '/javascript/page.js',
    //   dest: dest + '/js',
    //   outputName: 'page.js',
    //   // list of externally available modules to exclude from the bundle
    //   external: ['jquery', 'underscore']
    }]
  },

  production: {
    cssSrc: dest + '/css/*.css',
    jsSrc: dest + '/js/*.js',
    dest: dest,
    cssDest: dest + '/css',
    jsDest: dest + '/js'
  },

  svgSprite: {
    cwd: src + '/icons',
    src: '**/*.svg',
    dest: dest + '/images',
    options : {
      mode: {
        css: {
          layout: "horizontal",
          prefix: ".i-%s",
          common: "i",
          dimensions: "-s",
          sprite: "sprite.svg",
          dest: '.',
          render: {
            scss: {
              template: "gulp/tpl/_sprite.scss",
              dest: "../../src/sass/_sprite.scss"
            }
          }
        }
      }
    }
  }
};
