let {src, dest, parallel, series, watch} = require('gulp');

const ghpages      = require('gh-pages');
const path         = require('path');
const browserSync  = require('browser-sync').create();
const del          = require('del');
const pug          = require('gulp-pug');
const sass         = require('gulp-sass');
const imagemin     = require('gulp-imagemin');
const uglify       = require('gulp-uglify-es').default;
const plumber      = require('gulp-plumber');

function ghPages(cb) {
  ghpages.publish(path.join(process.cwd(), './build'), cb);
}

function devServer() {
  browserSync.init({
    server: {
      baseDir: 'build/'
    },
    watch: true,
    reloadDebounce: 150,
    notify: false,
    online: true
  });
}

function errorHandler(errors) {
  console.warn('Error!');
  console.warn(errors);
}

function buildPages() {
  return src('src/index.pug')
    .pipe(plumber({
      errorHandler
    }))
    .pipe(pug())
    .pipe(dest('build/'));
}

function buildStyles() {
  return src('src/styles/style.css')
    .pipe(plumber({
      errorHandler
    }))
    .pipe(sass())
    .pipe(dest('build/styles'))
}

function buildImages() {
  return src('src/images/*.*')
    .pipe(imagemin())
    .pipe(dest('build/images/'));
}

function buildScripts() {
  return src('src/scripts/*.js')
    .pipe(plumber({
      errorHandler
    }))
    .pipe(uglify())
    .pipe(dest('build/scripts/'));
}

function clearBuild() {
  return del('build/**/*', {
    force: true
  });
}

function watchFiles() {
  watch('src/styles/style.css', buildStyles);
  watch('src/index.pug', buildPages);
  watch('src/scripts/script.js', buildScripts);
  watch('src/images/*.*', buildImages);
}


exports.pages = ghPages;
exports.default =
  series(
    clearBuild,
    parallel(
      devServer,
      series(
        parallel(buildPages, buildStyles, buildScripts, buildImages),
        watchFiles
      )
    )
  );
