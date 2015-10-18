import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';

const $ = gulpLoadPlugins({ lazy: false });
const destPath = "./public/assets"

gulp.task('clean', (cb) => {
  del(destPath, cb);
});

gulp.task('build:manifest', (cb) => {
  $.sprockets.manifest()
    .pipe(gulp.dest(destPath))
});

gulp.task('build:js', (cb) => {
//  gulp.src(['./front/javascripts/**/*.js'])
//    .pipe($.babel())
//    .pipe($.sprockets.js())
//    .pipe($.uglify())
//    .pipe(gulp.dest(destPath))
});

gulp.task('build:css', (cb) => {
  gulp.src(['./front/stylesheets/**/*.scss', './front/stylesheets/**/*.sass'])
    .pipe($.sprockets.sass())
//    .pipe($.uglify())
    .pipe(gulp.dest(destPath))
});

gulp.task('build:image', (cb) => {
//  gulp.src(['./front/images/**/*.png'])
//    .pipe($.sprockets.image())
//    .pipe(gulp.dest(destPath))
});

gulp.task(
  'build',
  ['build:manifest', 'build:js', 'build:css', 'build:image']
);
