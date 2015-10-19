# gulp-sprockets

Sprockets for nodejs.

## Installation

```
npm install gulp-sprockets
```

## Usage

Gulpfile

```
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';

const $ = gulpLoadPlugins({ lazy: false });
const destPath = "./public/assets"

// initialize manifest!
$.sprockets.declare(destPath);

gulp.task('build:image', () => {
  return gulp.src(['app/assets/images/**/*.png'])
    .pipe($.sprockets.image())
    .pipe(gulp.dest(destPath))
});

gulp.task('build:js', () => {
  return gulp.src('app/assets/javascripts/*.js')
    .pipe($.sprockets.js())
    .pipe($.babel())
    .pipe(gulp.dest(destPath))
});

gulp.task('build:css', () => {
  return gulp.src('app/assets/stylesheets/*.scss')
    .pipe($.cached('css'))
    .pipe($.sprockets.sass())
    .pipe(gulp.dest(destpath))
});

gulp.task('default', () => {
  runSequence(
      'clean',
      'build:image',
      ['build:css', 'build:js']
  );
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

## Todo

- recognize sprockets directives, and translate
