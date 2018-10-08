const path = require('path');

const dir = process.env.PWD;
const src = path.resolve(dir, 'src');
const dest = path.resolve(dir, 'dist');

// Generic task to move static assets.
// Files are not watched for changes.
// Add all the paths you need.
const assets = [
  // {
  //   src: `${src}/fonts/**`,
  //   dest: `${dest}/fonts`,
  // },
];

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

const sass = {
  src: `${src}/sass/**/*.{sass,scss}`,
  dest: `${dest}/css`,
  options: {
    outputStyle: 'expanded',
    indentedSyntax: true,
  },

  // Css Selectors that should be removed from your css.
  // useful to remove unneeded thirdparty styles.
  remove: [],

  compression: {
    preset: 'default',
  },
};

const sprite = {
  src: `${src}/icons/**/*.svg`,
  dest: `${dest}/images`,
  sassDest: `${src}/sass/base`,
  spriteName: 'sprite.svg',
  template: `${dir}/gulpfile.js/tpl/_sprite.scss`,
};

const webpack = {
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
  resolve: {
    alias: {
      utils: `${src}/js/utils`,
      modules: `${src}/js/modules`,
    },
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
              presets: ['@babel/preset-env'],
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
  src: [sass.dest, webpack.output.path, images.dest],
};

module.exports = {
  dir,
  dest,
  src,
  browserSync,
  sass,
  assets,
  images,
  html,
  sprite,
  report,
  webpack,
};
