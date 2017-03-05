# Gulp-plate

[Gulp](http://gulpjs.com/) boilerplate & build system.

Includes the following tools, tasks, and workflows:

- [Webpack](https://webpack.js.org/) as JavaScript module bundler
- [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) in memory copilation for faster rebuils while developing.
- [ES2015](http://www.ecma-international.org/ecma-262/6.0/) syntax transpiled with [Babel](https://babeljs.io/)
- JavaScript linting using [ESLint](http://eslint.org/)
- Shimming non common-js vendor code with other dependencies (like a jQuery plugin) with [browserify-shim](https://github.com/thlorenz/browserify-shim))
- [SASS](http://sass-lang.com/) (super fast libsass with [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap), and [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))
- [Sass linting](https://github.com/sasstools/sass-lint)
- [BrowserSync](http://browsersync.io) for live reloading and static server
- [Image optimization](https://www.npmjs.com/package/gulp-imagemin)
- Svg icon sprite generation using [gulp-svg-sprite](https://github.com/jkphl/gulp-svg-sprite), with `<symbol>` & `<use>` tags or as CSS Background image
- Error handling in the console [and in Notification Center](https://github.com/mikaelbr/gulp-notify)

Looking for the [SilverStripe](https://github.com/silverstripe) version? [Look here](https://github.com/arillo/silverstripe-gulp-plate).

## Dependencies / Installation

Install Node. If you use homebrew, do:

```bash
$ brew install node
```

Otherwise, you can download and install from [here](http://nodejs.org/download/). At the time of writing Node version 4+ is needed.

Install Gulp globally:

```
$ npm install -g gulp
```

After the setup:

```
$ cd to project
$ npm install
```

This runs through all dependencies listed in `package.json` and downloads them to a `node_modules` folder in your project directory.

## commands

```bash
# These are equivalent
$ npm run build
$ npm run gulp
$ npm run g
```

Will run the default task and generate a dev version of the site in the `dist` folder.

```bash
# These are equivalent
$ npm start
$ npm run watch
$ npm run w
```

Will run the default task once, start a server and watch for file changes.

```bash
# These are equivalent
$ npm run production
$ npm run prod
$ npm run p
```

Will set `NODE_ENV='production'` and generate a production version of the site by compressing js, css & html. This is the folder that should go on the server.

If you want to run any other gulp task just append the task name to the build /gulp command:

```
$ npm run build sprite
$ npm run b sprite
$ npm run gulp sprite
$ npm run g sprite
```

__Important:__

The `dist` folder will be deleted every time you run build / watch / prod. Don't make any changes in the `dist` folder.

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

All paths and plugin settings have been abstracted into a centralized config object in `./gulpfile.js/config.js`. Adapt the paths and settings to the structure and needs of your project.

__Sprite config__

Set what type of sprite generation you want to use: (`symbol` is the default)

```js
...
svgSprite: {
  type: 'symbol' // set to 'symbol' or 'css'
  ...
}
...

```

- __`'symbol'`__ creates a SVG image that can be used to reference icons with the `<use>` tag.
- __`'css'`__ creates a SVG sprite that can be used as a background image in css.

__Generic move task__

There is a generic task to move static assets from the source directory without transformations, e.g. font files. To use is add the paths to the `move` array in the config file:

```js
...
move: [
  {
    src: "path/to/source-files",
    dest: "path/to/destination",
  },
]
...
```

## HTML Templates

Templates use [Nunjucks](https://github.com/mozilla/nunjucks). See the [docs](http://mozilla.github.io/nunjucks/) for more information on how to use them.

## Include external vendor css files

To include third-party styles in your css use the `includePaths` array in the `config.js` file:

```js
// gulpfile.js/config.js

{
  //...
  sass: {
    settings: {
      includePaths: [
        './node_modules/normalize.css',
        // put other paths here..
      ]
    }
  },
  //...
}
```

Include it using a regular `@import`:

```sass
@import "normalize"
```

The Sass compiler will look for files with `.sass`, `.scss` and `.css` extension and include its contents in the generated file.

If there happen to be multiple files with the same name but different extensions (e.g. `slick.css` and `slick.scss`) the compiler will throw an error. To circumvent this problem include the file extension in the `@import`:

```sass
@import "slick.scss"
```

Sass will always prefer Sass files (`.sass` or `.scss`) over css files, so when you hit this problem you have to import the Sass file over the css file.

## Shim a jQuery plugin to work with webpack

See instructions here: https://webpack.js.org/guides/shimming/

__Note:__

At the moment the webpack config is generated in the `/gulpfile.js/util/getWebpackConfig.js` file. Apply changes there as needed (this might be changed in the future).

## Declare aliases for frequently required files

See instructions here: https://webpack.js.org/configuration/resolve/#resolve-alias

__Note:__

At the moment the webpack config is generated in the `/gulpfile.js/util/getWebpackConfig.js` file. Apply changes there as needed (this might be changed in the future).

## Multiple JavaScript bundles & library sharing between bundles

To generate multiple bundles add new entries to the `webpack.entry` array in the `config.js` file (file paths are relative to the `webpack.srcFolder`):

```js
webpack: {
  entry: {
    main: ['./main.js'],
    otherFile: ['./otherFile.js'],
  }
}
```

If you do this it is probably a good idea to generate another bundle that contains all shared vendor code.

Instructions can be found here: https://webpack.js.org/guides/code-splitting-libraries/

__Note:__

At the moment the webpack config is generated in the `/gulpfile.js/util/getWebpackConfig.js` file. Apply changes there as needed (this might be changed in the future).


## Known issues

- The Sass files to be rendered as `.css` files need to have the extension `.sass` otherwise the compiler fails. Partials can be both `.sass` and `.scss`.

## Credits

- Gulp-plate is based on https://github.com/greypants/gulp-starter
