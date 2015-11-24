# gulp-sprockets [![Build Status](https://travis-ci.org/waka/gulp-sprockets.svg?branch=master)](https://travis-ci.org/waka/gulp-sprockets)


gulp-sprockets is NodeJS implementation of [Sprockets](https://github.com/sstephenson/sprockets). 
It be able to build and precompile assets of Rails with only in Node.js, without Rails.  
gulp-sprockets interprets Sprockets directives, to concat asset files.  
And you may not already hit the command `rake assets:precompile`.

## Provided gulp streams

- `sprockets.css` provide things of asset pipeline for CSS/SCSS/Sass.
- `sprockets.js` provide things of asset pipeline for JavaScript/CoffeeScript.
- `sprockets.precompile` provide things of asset precompiling.

## Installation

```
npm install gulp-sprockets
```

## Usage

gulpfile.babel.js

```js
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';

const $ = gulpLoadPlugins({ lazy: false });
const assetsPaths = {
  app: "./app/assets",
  javascripts: [],
  stylesheets: [],
  images: []
};
const destPath = "./public/assets";
const release = process.env.NODE_ENV === 'release'

// initialize sprockets!
$.sprockets.declare(assetsPaths, destPath);


/**
 * Sprockets way
 */

gulp.task('build:image', () => {
  return gulp.src([assetsPaths.app + '/images/**/*.png'])
    .pipe($.if(release, $.sprockets.precompile()))
    .pipe(gulp.dest(destPath))
});

gulp.task('build:js', () => {
  return gulp.src([assetsPaths.app + '/javascripts/*.js'])
    .pipe($.sprockets.js())
    .pipe($.if(release, $.sprockets.precompile()))
    .pipe(gulp.dest(destPath))
});

gulp.task('build:css', () => {
  return gulp.src([assetsPaths.app + '/stylesheets/*.css'])
    .pipe($.cached('css'))
    .pipe($.sprockets.css({precompile: release}))
    .pipe($.if(release, $.sprockets.precompile()))
    .pipe(gulp.dest(destpath))
});

gulp.task('default', () => {
  // the task of building image must be processed before others
  runSequence('build:image', ['build:css', 'build:js']);
})

```

package.json

```
{
  "scripts": {
    "build": "gulp"
  },
  ...
}
```

And then do build command.

```
$ npm run build
```
