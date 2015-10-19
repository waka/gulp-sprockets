import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import sprockets from '../';
import del from 'del';
import runSequence from 'run-sequence';

const $ = gulpLoadPlugins({ lazy: false });
const assetsPath = "./app/assets"
const destPath = "./public/assets"
const release = process.env.NODE_ENV === 'release'

// initialize sprockets!
sprockets.declare([assetsPath], destPath);


/**
 * Sprockets way
 */

gulp.task('build:image', () => {
  return gulp.src([assetsPath + '/images/**/*.png', assetsPath + '/images/**/*.jpg'])
    .pipe($.if(release, sprockets.precompile()))
    .pipe(gulp.dest(destPath))
});

gulp.task('build:css', () => {
  return gulp.src([assetsPath + '/stylesheets/*.css'])
    .pipe($.cached('css'))
    .pipe(sprockets.css({precompile: release}))
    .pipe($.if(release, sprockets.precompile()))
    .pipe(gulp.dest(destPath))
});

gulp.task('build:js', () => {
  return gulp.src([assetsPath + '/javascripts/*.js'])
    .pipe(sprockets.js())
    .pipe($.if(release, sprockets.precompile()))
    .pipe(gulp.dest(destPath))
});


/**
 * ES6
 */

gulp.task('build:es6', () => {
  return gulp.src([assetsPath + '/javascripts/roots/*.js'])
    .pipe($.babel())
    .pipe($.if(release, sprockets.precompile()))
    .pipe(gulp.dest(destPath))
});


/**
 * SCSS
 */

gulp.task('build:scss', () => {
  return gulp.src([assetsPath + '/stylesheets/roots/*.scss'])
    .pipe($.cached('scss'))
    .pipe(sprockets.scss({precompile: release}))
    .pipe($.if(release, sprockets.precompile()))
    .pipe(gulp.dest(destPath))
});


/**
 * Provided tasks
 */

gulp.task('clean', (cb) => {
  return del(destPath, cb);
});

gulp.task('default', () => {
  runSequence(
      'clean',
      'build:image',
      ['build:css', 'build:js', 'build:scss', 'build:es6']);
});

gulp.task('watch', ['default'], () => {
  gulp.watch([assetsPath + '/javascripts/**/*.coffee'], ['build:js'])
    .on('change', (e) => {
      console.log(`File ${e.path} was ${e.type}, running build task...`);
    });
  gulp.watch([assetsPath + '/stylesheets/**/*.(css|scss|sass)'], ['build:css'])
    .on('change', (e) => {
      console.log(`File ${e.path} was ${e.type}, running build task...`);
    });
});
