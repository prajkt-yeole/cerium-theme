//gulp file by prajkty 

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
//var cssnano = require('gulp-cssnano');
//var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');


gulp.task('hello', function() {
  console.log('Hello world');
});

gulp.task('sass', function(){
  return gulp.src('src/scss/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
});

gulp.task('useref', function(){
  return gulp.src('src/*.html')
    .pipe(useref())
    //.pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// gulp.task('images', function(){
//   return gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
//   .pipe(imagemin({
//       // Setting interlaced to true
//       interlaced: true
//     }))
//   .pipe(gulp.dest('dist/images'))
// });


gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

//dev task
gulp.task('serve', ['browserSync', 'sass'], function (){
  gulp.watch('src/scss/*.scss', ['sass']); 
  gulp.watch('src/*.html', browserSync.reload); 
  gulp.watch('src/js/**/*.js', browserSync.reload); 
  // Other watchers
});

//final build task
gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
});