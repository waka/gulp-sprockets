# Nrockets

Alt sprockets for nodejs.

## Installation

```
npm install nrockets
```

## Usage

Gulpfile

```
import nrockets from 'nrockets';

gulp.task('js', () => {
  gulp.src('app/assets/javascripts/**/*.js')
    .pipe(nrockets.js())
    .pipe(babel())
    .pipe(gulp.dest('public/assets/'))
});

gulp.task('css', () => {
  gulp.src('app/assets/stylesheets/**/*.scss')
    .pipe(nrockets.css())
    .pipe(sass())
    .pipe(gulp.dest('public/assets/'))
});

gulp.task('build:before', () => {
  nrockets.manifest()
});
gulp.task('build', ['js', 'css']);
```

## Todo

- generate file hash
- create manifest.json
- emulate assets function (`image-url()`)
- cache system
