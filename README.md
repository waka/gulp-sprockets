# gulp-sprockets [![Build Status](https://travis-ci.org/waka/gulp-sprockets.svg?branch=master)](https://travis-ci.org/waka/gulp-sprockets)


Sprockets for nodejs.  
It be able to run the build process only in Node.js.  
You may not hit the command `rake assets:precompile`.

## Installation

```
npm install gulp-sprockets
```

## Usage

gulpfile.babel.js

```
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';

const $ = gulpLoadPlugins({ lazy: false });
const assetsPath = "./app/assets";
const destPath = "./public/assets";
const release = process.env.NODE_ENV === 'release'

// initialize sprockets!
$.sprockets.declare([assetsPath], destPath);


/**
 * Sprockets way
 */

gulp.task('build:image', () => {
  return gulp.src([assetsPath + '/images/**/*.png'])
    .pipe($.if(release, $.sprockets.precompile()))
    .pipe(gulp.dest(destPath))
});

gulp.task('build:js', () => {
  return gulp.src([assetsPath + '/javascripts/*.js'])
    .pipe($.sprockets.js())
    .pipe($.if(release, $.sprockets.precompile()))
    .pipe(gulp.dest(destPath))
});

gulp.task('build:css', () => {
  return gulp.src([assetsPath + '/stylesheets/*.css'])
    .pipe($.cached('css'))
    .pipe($.sprockets.css({precompile: release}))
    .pipe($.if(release, $.sprockets.precompile()))
    .pipe(gulp.dest(destpath))
});

gulp.task('default', () => {
  // image task must be processed before others
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
