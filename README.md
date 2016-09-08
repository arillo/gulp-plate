# Gulp-plate

[Gulp](http://gulpjs.com/) boilerplate & build system.

Includes the following tools, tasks, and workflows:

- [Browserify](http://browserify.org/) as JavaScript module bundler
- [Watchify](https://github.com/substack/watchify) (caching version of browserify for super fast rebuilds)
- [ES2015](http://www.ecma-international.org/ecma-262/6.0/) syntax transpiled with [Babel](https://babeljs.io/) using [Babelify](https://github.com/babel/babelify) (with source maps!)
- JavaScript linting using [ESLint](http://eslint.org/)
- Shimming non common-js vendor code with other dependencies (like a jQuery plugin) with [browserify-shim](https://github.com/thlorenz/browserify-shim))
- [SASS](http://sass-lang.com/) (super fast libsass with [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap), and [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))
- [Sass linting](https://github.com/sasstools/sass-lint)
- [BrowserSync](http://browsersync.io) for live reloading and a static server
- [Image optimization](https://www.npmjs.com/package/gulp-imagemin)
- Svg icon sprite generation using [gulp-svg-sprite](https://github.com/jkphl/gulp-svg-sprite), with `<symbol>` and `<use>` tags or as CSS Background image
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

## `gulp` commands

Use `npm` to use the locally installed version of gulp in `./node_modules/bin` instead of the global version.

```
$ npm run gulp
```

Will generate a dev version of the site in the `dist` folder


```
$ npm run watch
```

Will run the default task once, start a server and watch for file changes.

```
$ npm run prod
```

Will generate a production version of the site by compressing js & css & html. This is the folder that should go on the server.

If you want to run any other gulp task just append the task name to the gulp command:

```
$ npm run gulp sprite
```

__Important:__

Every time you run one of the commands the generated theme will be deleted! Don't make any changes in that directory.

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

```javascript
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

There is a generic task to move assets from the source directory without transformations, e.g. font files. To use is add the paths to the `move` array in the config file:

```javascript
...
move: {
  {
    src: "path/to/source-files"
    dest: "path/to/destination"
  }
}
...
```

## HTML Templates

Templates use [Nunjucks](https://github.com/mozilla/nunjucks). See the [docs](http://mozilla.github.io/nunjucks/) for more information on how to use them.

## Include external vendor css files

If you want to include external css files from npm or bower (bower is not setup by default but feel free to include it) you can just import them in your sass files as css imports. The gulp `sass` task will take care of pulling the file content into the generated css file.

```sass
// main.sass

@import "my-sass-module"
// will be inlined in the main file:
@import "../../node_modules/normalize.css/normalize.css"
```

__Note:__

Scoping imports to a class will just be ignored:

```sass
.myClass
  @import "../../node_modules/normalize.css/normalize.css"

// will output:

// normalize stuff ...

.myClass {}
```

Code imported this way will be at the top of the generated CSS file as sass moves all includes to the top of the file and the inlining has to happen after Sass compilation. There are no known issues with this at the time of writing.

## Shim a jQuery plugin to work with browserify

```js
// package.json

{
...
  "browser": {
    // Path to your plugin
    "plugin": "./src/js/vendor/jquery-plugin.js"
  },
  "browserify-shim": {
    // Shim it and declare dependencies
    "plugin": {
      "exports": "plugin",
      "depends": [
        "jquery:$"
      ]
    }
  },
...
}

// use in main.js
var plugin = require('plugin');

plugin();

```

## Declare aliases for frequently required files

If you have to require one of your own files a lot you can add it as an alias to `"browser"` in the `package.json` file

```js
// package.json

{
...
  "browser": {
    // Path to your plugin
    "myScript": "./src/js/ui/my-script.js"
  },
...
}

// use in main.js
var myScript = require('myScript');
// instead of
var myScript = require('./ui/myScript');

```

## Multiple JavaScript bundles & library sharing between bundles

When creating multiple JavaScript bundles it is important to include each library (e.g. jQuery) only once in your _main_ or _library_ bundle instead of every single bundle. To make this work follow the steps below to share `jquery` for example:

__In your `package.json`__

```js
{
  //...
  // Add the library you want to share to the `browser` object
  // Look inside the package.json file of the library you want to share 
  // to know which is the `main` file it exports.
  "browser" : {
    "jquery": "./node_modules/jquery/dist/jquery.js"
  },
  //...
}
```

__In your `gulpfile.js/config.js`__

```js
{
  //...
  browserify: {
    bundleConfigs: [
      // This is the main bundle that contains the libraries
      {
        entries: src + '/js/main.js',
        dest: dest + '/js',
        outputName: 'main.js',
        // This will include `jquery` in the main bundle weather it is uses
        //`require('jquery')` itself or not, and make it available to the
        // other bundles
        require: ['jquery']
      },

      // This is another bundle that will be generated
      // it uses `jquery` but does not include it itself
      {
        entries: src + '/js/other-bundle.js',
        dest: dest + '/js',
        outputName: 'other-bundle.js',
        // This bit lets the bundle know that it has to get 
        // jquery from somewhere else
        external: ['jquery']

      }
    ]
  }
  //...
}
```

## Known issues

- The Sass files to be rendered as `.css` files need to have the extension `.sass` otherwise the compiler fails. Partials can be both `.sass` and `.scss`.

## Credits

- Gulp-plate is based on https://github.com/greypants/gulp-starter
