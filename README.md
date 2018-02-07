# Gulp-plate

[Gulp](http://gulpjs.com/) boilerplate & build system.

Includes the following tools, tasks, and work-flows:

* [Webpack](https://webpack.js.org/) as JavaScript module bundler
* [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) for live reloading (in memory compilation for faster rebuilds while developing)
* [ES2015](http://www.ecma-international.org/ecma-262/6.0/) syntax transpiled with [Babel](https://babeljs.io/)
* [ESLint](http://eslint.org/) for JavaScript linting
* [Prettier](https://prettier.io/) for JavaScript code formatting
* [SASS](http://sass-lang.com/) compiled with libsass, [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap), [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer) and [Sass linting](https://github.com/sasstools/sass-lint)
* [BrowserSync](http://browsersync.io) for live reloading and static server
* [svgo](https://github.com/svg/svgo) for SVG compression.
* [gulp-svg-symbols](https://github.com/Hiswe/gulp-svg-symbols) to generate a SVG icon sprite with `<symbol>` & `<use>` tags

Looking for the [SilverStripe](https://github.com/silverstripe) version? [Look here](https://github.com/arillo/silverstripe-gulp-plate).

## Dependencies / Installation

Gulp-plate depends on the following technologies:

* [node.js](http://nodejs.org) as local host environment for gulp (v. 7.5.0 or higher) [1]
* [gulp](http://gulpjs.com/) as task-runner
* [yarn](https://yarnpkg.com) as dependency manager

[1] It is recommended to install node trough [nvm](https://github.com/creationix/nvm) (Node Version Manager).

To get started:

```bash
$ git clone https://github.com/arillo/gulp-plate myProject
$ cd myProject
$ rm -r .git    # Remove the link to the git repo
$ yarn          # Install dependencies
```

## Commands

```bash
# Equivalent
$ yarn run build
$ yarn run gulp
$ yarn run g
```

Will run the default task and generate a dev version of the site in the `dist` folder.

```bash
# Equivalent
$ yarn start
$ yarn run watch
$ yarn run w
```

Will run the default task once, start a server and watch for file changes.

```bash
# Equivalent
$ yarn run production
$ yarn run prod
$ yarn run p
```

Will set `NODE_ENV='production'` and generate a production version of the site by compressing js, css & html. This is the folder that should go on the server.

If you want to run any other gulp task just append the task name to the build /gulp command:

```bash
# Equivalent
$ yarn run build sprite
$ yarn run b sprite
$ yarn run gulp sprite
$ yarn run g sprite
```

**Important:**

The `dist` directory will be deleted every time you run build / watch / prod. Don't make any changes in the `dist` directory.

## Folder structure

```bash
myProject/
  gulpfile.js/  # gulp tasks
  src/
    icons/      # SVG files to be included in he the sprite
    images/     # other images
    js/         # js code
    sass/       # Sass code, SCSS and Sass indented syntax possible
    html/       # html templates
      data/     # data in json format
      layouts/  # reusable layout templates
      macros/   # Nunjucks macros
      shared/   # reusable snippets
```

## Configuration

All paths and plugin settings have been abstracted into a centralized file: `./gulpfile.js/config.js`. Adapt the paths and settings to the structure and needs of your project.

## SVG Sprite configuration

The sprite creates an image with the name `sprite.svg` in `./dist/images/`. It also creates a Sass file named: `_sprite.scss` in `./src/sass/base/`.

The generated Sass files contains useful information about the sprite icons like the dimensions of each icon. The file will change every time an icon is added, removed or changed, do not edit it manually. You can change the file by changing the template in `./gulpfile.js/tpl/_sprite.scss`.

## Static assets

To move static assets from the source directory without transformations, e.g. font files. Add the `src` and `dest` paths to the `static` array in the `config.js`

## HTML Templates

Templates use [Nunjucks](https://github.com/mozilla/nunjucks). See the [docs](http://mozilla.github.io/nunjucks/) for more information on how to use them.

## Sass

Sass indented syntax is used by default. The main Sass files need to have a `.sass` extension, otherwise the compiler fails. Partials can be both `.sass` and `.scss`.

### Include external vendor css files

To include third-party styles in your css use the `includePaths` array in the `config.js` file:

```js
// gulpfile.js/config.js

const sass = {
  //...
  settings: {
    includePaths: [
      './node_modules/normalize.css',
      // put other paths here..
    ],
  },
  //...
};
```

Include it using a regular `@import`:

```
@import "normalize"
```

The Sass compiler will look for files with `.sass`, `.scss` and `.css` extension and include its contents in the generated file.

If there happen to be multiple files with the same name but different extensions (e.g. `style.css` and `style.scss`) the compiler will throw an error. To circumvent this problem include the file extension in the `@import`:

```
@import "style.scss"
```

Sass will always prefer Sass files (`.sass` or `.scss`) over css files, so when you hit this problem you have to import the Sass file over the css file.

### Sass-lint errors

At the time of writing `sass-lint` fails when it encounters empty selectors. This is a [bug](https://github.com/sasstools/sass-lint/issues/820), it can be prevented by adding a comment (`//`) at the end of the file (does not allways work).

## JavaScript

The `./gulpfile.js/config.js` file contains the full webpack configuration (see the `js` variable). Feel free to alter is as needed. Keep in mind that the `babel-loader` should always be present as `eslint` will rely on it.

There configuration will be slightly altered depending on the task you are running. When using the watch task, Javascript compilation will happen in memory, so no files are written to disk (`./dist/js/` will be empty) and `webpack-hot-middleware/client` will be injected in all bundles for live reloading to work. When building for production `webpack.optimize.UglifyJsPlugin` is used for minification. Take a look at `./gulpfile.js/util/getWebpackConfig.js` to see exactly what is happening and change it as needed.

Here are some useful recipes to get you up and running:

### Declare aliases for frequently required files

```js
// gulpfile.js/config.js

const js = {
  resolve: {
    extensions: ['.js'],
    alias: {
      // Path relative to `context`
      myModule: './myModule/myModule.js',
    },
  },
};
```

```js
// src/js/some-file.js

import myModule from 'myModule';

myModule();
```

Docs: https://webpack.js.org/configuration/resolve/#resolve-alias

### Shimming non CommonJs modules

#### jQuery plugin

```js
// gulpfile.js/config.js

const webpack = require('webpack');
//...
const js = {
  plugins: [
    // Make jQuery global, expected by the plugin.
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
    }),
  ],
  //...
  resolve: {
    // Add extensions to prevent linting errors.
    extensions: ['.js', '.json'],
    // Path from `node_modules`, where `myModule` is the module name.
    alias: {
      myModule: 'myModule/dist/myModule.js',
    },
  },
};
```

```js
// src/js/main.js

import $ from 'jquery';
import 'myModule';

$('.js-selector').myModule();
```

#### Regular JavaScript module

```js
// gulpfile.js/config.js

const js = {
  //...
  resolve: {
    // Add extensions to prevent linting errors.
    extensions: ['.js', '.json'],
    // Path from `node_modules`, where `myModule` is the module name.
    alias: {
      myModule: 'myModule/dist/myModule.js',
    },
  },
  module: {
    rules: [
      // ...
      {
        include: require.resolve('myModule/dist/myModule.js'),
        loader: 'exports-loader?MyModule',
      },
    ],
  },
};
```

```js
// src/js/main.js

import $ from 'jquery';
import MyModule from 'myModule';

const myInstance = new MyModule();
```

Docs: https://webpack.js.org/guides/shimming/

### Multiple JavaScript bundles & vendor code sharing

To create multiple bundles add entires to `entry`

```js
// gulpfile.js/config.js

const js = {
  // ...
  entry: {
    main: ['./main.js'],
    other: ['./someFile.js', './sotherOtherFile.js'],
  },
  // ...
};
```

This will generate two bundles: `main.js` & `other.js`.

If you do this it is probably a good idea to generate another bundle that contains all shared vendor code:

```js
// gulpfile.js/config.js

const webpack = require('webpack');
//...
const js = {
  // ...
  entry: {
    main: ['./main.js'],
    other: ['./someFile.js', './sotherOtherFile.js'],
    // List vendor modules here:
    vendor: ['jquery', 'svg4everybody'],
  },
  // ...
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // Specify the common bundle's name
    }),
  ],
  // ...
};
```

Docs: https://webpack.js.org/guides/code-splitting-libraries/

## Roadmap

* [ ] Research Tree-shaking with webpack and implement if possible

## Credits

Gulp-plate is based on https://github.com/greypants/gulp-starter
