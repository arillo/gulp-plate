const convertToRem  = require('./util/convertToRem');
const path          = require('path');

const src   = path.resolve(process.env.PWD, 'src');
const dest  = path.resolve(process.env.PWD, 'dist');


const browserSync = {
  port: 9000,
  server: {
    baseDir: dest,
  },
  notify: false,
  open: false,
};

const sass = {
  src: `${src}/sass/**/*.{sass,scss}`,
  dest: `${dest}/css`,
  settings: {
    outputStyle: 'expanded',
    indentedSyntax: true,
    // Include paths to thirdparty styles
    includePaths: [
      './node_modules/normalize.css',
    ],
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
    'bb >= 10',
  ],
  // Css Selectors that should be removed from your css.
  // useful to remove unneeded thirdparty styles.
  remove: [],

  compression: {
    safe: true,
    mergeLonghand: false,
    discardComments: {
      removeAll: true,
    },
  },
};

// Generic move task to move static assets.
// Files are not watched for changes.
const move = [
  // {
  //   src: src + '/fonts/**',
  //   dest: `${dest}/fonts`,
  // }
];

const images = {
  src: `${src}/images/**`,
  dest: `${dest}/images`,
};

const html = {
  src: `${src}/html`,
  dest: `${dest}/`,
  glob: '**/*.{html,json}',
  data: `${src}/html/data/*.json`,
  extensions: ['html', 'json'],
  excludeFolders: ['layouts', 'shared', 'macros', 'data'],

  compression: {
    collapseWhitespace: true,
  },
};

const sprite = {
  src: `${src}/icons`,
  dest: `${dest}/images`,

  // Sprite type: `symbol` or `css` (for bg images)
  type: 'symbol',
  sassDest: '../../src/sass/base/_sprite.scss',
  spriteImgName: 'sprite.svg',
  templateSymbol: 'gulpfile.js/tpl/_sprite-symbol.scss',
  templateCss: 'gulpfile.js/tpl/_sprite-css.scss',
  templateVars: {
    cssPath: '../images/',
    rem: convertToRem,
  },
};

const eslint = {
  src: [
    `${src}/js/**/*.js`,
    './gulpfile.js/**/*.js',
  ],
  options: './.eslintrc',
};

const report = {
  src: [
    `${dest}/css/*.css`,
    `${dest}/js/*.js`,
    `${dest}/images/**/*`,
  ],
};

const webpack = {
  plugins: [],
  context: `${src}/js`,
  entry: {
    // Relative to the js folder.
    main: ['./main.js'],
  },
  output: {
    filename: '[name].js',
    path: `${dest}/js`,
    // Path on server
    publicPath: '/js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};

module.exports = {
  dest, src, browserSync, sass, move, images, html, sprite, eslint, report, webpack,
};
