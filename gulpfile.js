const gulp            = require('gulp');
const browserSync     = require('browser-sync').create();
const pug             = require('gulp-pug');
const sass            = require('gulp-sass');
const spritesmith     = require('gulp.spritesmith');
const rimraf          = require('rimraf');
const rename          = require('gulp-rename');
const uglify          = require('gulp-uglify');
const concat          = require('gulp-concat');
const sourcemaps      = require('gulp-sourcemaps');
const imagemin        = require('gulp-imagemin');

/* -------- Server  -------- */
gulp.task('server', function() {
  browserSync.init({
    server: {
      port: 9000,
      baseDir: "build"
    }
  });

  gulp.watch('build/**/*').on('change', browserSync.reload);
});

/* ------------ Pug compile ------------- */
gulp.task('templates:compile', function buildHTML() {
  return gulp.src('source/template/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build'))
});

/* ------------ Styles compile ------------- */
gulp.task('styles:compile', function () {
  return gulp.src('source/styles/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('build/css'));
});

/* ------------ js ------------- */

gulp.task('js', function () {
  return gulp.src([
      'source/js/main.js',
      'source/js/form.js',
      'source/js/nav.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));

});

/* ------------ js:libs ------------- */

gulp.task('js:libs', function () {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));

});

/* ------------ Sprite ------------- */
gulp.task('sprite', function(cb) {
  const spriteData = gulp.src('source/images/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../images/sprite.png',
    cssName: 'sprite.scss'
  }));

  spriteData.img.pipe(gulp.dest('build/images/'));
  spriteData.css.pipe(gulp.dest('source/styles/global/'));
  cb();
});

/* ------------ Delete ------------- */
gulp.task('clean', function del(cb) {
  return rimraf('build', cb);
});

/* ------------ Copy fonts ------------- */
gulp.task('copy:fonts', function() {
  return gulp.src(['./source/fonts/**/*.*', 'node_modules/fontisto/fonts/**/*.*'])
    .pipe(gulp.dest('build/fonts'));
});

/* ------------ Min&Copy images ------------- */
gulp.task('copy:images', function() {
  return gulp.src('./source/images/**/*.*')
    .pipe(gulp.dest('build/images'));
});

/* ------------ Copy php ------------- */

gulp.task('copy:php', function () {
  return gulp.src('./source/php/**/*.*')
    .pipe(gulp.dest('build/php'));
});

/* ------------ Copy system ------------- */

gulp.task('copy:system', function () {
  return gulp.src('./source/system/.htaccess')
    .pipe(gulp.dest('build'));
});

/* ------------ Copy ------------- */
gulp.task('copy', gulp.parallel('copy:fonts', 'js:libs', 'copy:images', 'copy:system', 'copy:php'));

/* ------------ Watchers ------------- */
gulp.task('watch', function() {
  gulp.watch('source/template/**/*.pug', gulp.series('templates:compile'));
  gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
  gulp.watch('source/js/**/*.js', gulp.series('js'));
  gulp.watch('source/php/**/*.php', gulp.series('copy:php'));
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('templates:compile', 'styles:compile','js', 'sprite', 'copy', 'copy:php'),
  gulp.parallel('watch', 'server')
  )
);
