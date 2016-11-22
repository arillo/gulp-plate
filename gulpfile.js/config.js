'use strict';

var convertToRem = require('./util/convertToRem');

var dest = './dist';
var src = './src';

module.exports = {
  destFolder: dest,

  browserSync: {
    port: 9000,
    server: {
      baseDir: dest
    },
    notify: false,
    open: false
  },

  sass: {
    src: src + '/sass/**/*.{sass,scss}',
    dest: dest + '/css',
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
      outputStyle: 'expanded',
      includePaths: [
        './node_modules/normalize.css'
      ]
    },
    prefix: [
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 28',
      'ios >= 8',
      'edge >= 13',
      'android >= 4.4',
      'bb >= 10'
    ],
    // Css Selectors that should be removed from your css.
    // useful to remove unneeded thirdparty styles.
    remove: []
  },

  // Generic move task, useful to move assets that do
  // not need transformations. Keep in mind that
  // these files will not be watched and are only
  // moved when the default task is executed.
  move: [
    // {
    //   src: src + '/fonts/**',
    //   dest: dest + '/fonts'
    // }
  ],

  images: {
    src: src + '/images/**',
    dest: dest + '/images'
  },

  html: {
    src: src + '/html',
    dest: dest + '/',
    glob: '**/*.{html,json}',
    data: [src + '/html/data/global.json'],
    extensions: ['html', 'json'],
    excludeFolders: ['layouts', 'shared', 'macros', 'data']
  },

  eslint: {
    src: src + '/js/**/*.js',
    options: './eslintrc.json'
  },

  svgSprite: {
    src: src + '/icons',
    glob: '**/*.svg',
    dest: dest + '/images',

    // Sprite type:
    // 1. `symbol` for inline SVGs
    // 2. `css` for sprites as css background image
    type: 'symbol',

    // These paths are not very straight forward as
    // the svg-sprite plugin as a strange API.
    sassDest: '../../src/sass/base/_sprite.scss',
    spriteImgName: 'sprite.svg',
    templateSymbol: 'gulpfile.js/tpl/_sprite-symbol.scss',
    templateCss: 'gulpfile.js/tpl/_sprite-css.scss',
    templateVars: {
      cssPath: '../images/',
      rem: convertToRem
    },
  },

  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below.
    // See README.md for more info.
    bundleConfigs: [
      {
        entries: src + '/js/main.js',
        dest: dest + '/js',
        outputName: 'main.js'
      }
    ]
  },

  production: {
    dest: dest,

    cssSrc: dest + '/css/*.css',
    jsSrc: dest + '/js/*.js',
    htmlSrc: dest + '/**/*.html',

    cssDest: dest + '/css',
    jsDest: dest + '/js',
    htmlDest: dest,

    htmlminOpts: {
      'collapseWhitespace': true
    },

    cssCompressionOpts: {
      safe: true,
      mergeLonghand: false,
      discardComments: {
        removeAll: true
      }
    },

    reportSrc: [
      dest + '/css/*.css',
      dest + '/js/*.js',
      dest + '/images/**/*'
    ]
  }
};
