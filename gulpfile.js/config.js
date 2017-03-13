/* eslint import/no-extraneous-dependencies: 0 */

const convertToRem  = require('./util/convertToRem');
const path          = require('path');

const dir   = process.env.PWD;
const src   = path.resolve(dir, 'src');
const dest  = path.resolve(dir, 'dist');

const browserSync = {
  port: 9000,
  server: {
    baseDir: dest,
  },
  notify: false,
  open: false,
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

const images = {
  src: `${src}/images/**`,
  dest: `${dest}/images`,
};

// Generic task to move static assets.
// Files are not watched for changes.
const assets = [
  // {
  //   src: `${src}/fonts/**`,
  //   dest: `${dest}/fonts`,
  // },
];

const sass = {
  src: `${src}/sass/**/*.{sass,scss}`,
  dest: `${dest}/css`,
  options: {
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
    core: false,
    autoprefixer: false,
    discardComments: {
      removeAll: true,
    },
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

const js = {
  context: `${src}/js`,
  entry: {
    // Path relative to `context`
    main: ['./main.js'],
  },
  output: {
    filename: '[name].js',
    path: `${dest}/js`,
    // Path on server
    publicPath: '/js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015'],
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
    ],
  },
};

const report = {
  src: [sass.dest, js.output.path, images.dest],
};

module.exports = {
  dir, dest, src, browserSync, sass, assets, images, html, sprite, report, js,
};
