import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

gulp.task('build', () => {
  gulp.src(['./src/**/*.js'])
    .pipe($.babel())
    //.pipe($.uglify())
    .pipe(gulp.dest('lib'))
});

gulp.task('release', () => {
  gulp.src(['./src/**/*.js'])
    .pipe($.babel())
    .pipe($.uglify())
    .pipe(gulp.dest('lib'))
});

gulp.task('watch', ['build'], () => {
  gulp.watch('./src/**/*.js', ['build'])
    .on('change', (e) => {
      console.log(`File ${e.path} was ${e.type}, running build task...`);
    });
});
