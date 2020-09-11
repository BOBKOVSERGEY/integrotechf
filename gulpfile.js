//"use strict";
// modules
const { src, dest, parallel } = require("gulp");
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const spritesmith = require('gulp.spritesmith');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const panini = require("panini");
const plumber = require("gulp-plumber");
const babel = require('gulp-babel');

//path
var SRC_DIR = './src/';
var DIST_DIR = './dist/';

var path = {
  sass : {
    entry : SRC_DIR + 'styles/main.scss',
    src : SRC_DIR + 'styles/**/*.scss',
    dist : DIST_DIR + 'css'
  },
  js : {
    entry : SRC_DIR + 'js/main.js',
    src : SRC_DIR + 'js/**/*.js',
    dist : DIST_DIR + 'js'
  },
  sprite : {
    src : SRC_DIR + 'img/icons/*.png',
    distImg : DIST_DIR + 'img',
    imgLocation: '../img/sprite.png',
    distFile : SRC_DIR + 'styles/sprite'
  },
  build: {
    html: "./",

  },
  src: {
    html: "src/*.{htm,html,php}",
  },
  watch: {
    html: "src/**/*.{htm,html,php}",
  }
}

function html() {
  panini.refresh();
  return src(path.src.html, { base: 'src/' })
    .pipe(plumber())
    .pipe(panini({
      root: 'src/',
      layouts: 'src/tpl/layouts/',
      partials: 'src/tpl/partials/',
      helpers: 'src/tpl/helpers/',
      data: 'src/tpl/data/'
    }))
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}
//imagemin

// Compress Task
function compress() {
  src('src/img/*') // Выберем наши картинки
    .pipe(imagemin())
    .pipe(dest('dist/images'))// Переместим в images
}

// sprite
function sprite() {
  var spriteData = src(path.sprite.src).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    cssFormat: 'css',
    imgPath : path.sprite.imgLocation,
    padding: 70

  }));
  spriteData.img.pipe(dest(path.sprite.distImg));
  spriteData.css.pipe(dest(path.sprite.distFile));
}

function css() {
  return src(path.sass.entry)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ["last 8 versions"],
      cascade: false
    }))
    .pipe(csso())
    //.pipe(sourcemaps.write())
    .pipe(dest(path.sass.dist));
}

//tasks
/*gulp.task('sass', function () {
  return gulp.src(path.sass.entry)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['>5%'],
      cascade: false
    }))
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.sass.dist));
});*/

function js(cb) {
  pump([
      src(path.js.entry),
      babel({
        presets: ['@babel/env']
      }),
      uglify(),
      dest(path.js.dist)
    ],
    cb
  );
}

/*gulp.task('js', function(cb) {
  pump([
      gulp.src(path.js.entry),
      uglify(),
      gulp.dest(path.js.dist)
    ],
    cb
  );
});
*/

function watch(done) {
  browserSync.init({
    server: "./"
  });
  gulp.watch([path.watch.html], html);
  gulp.watch(path.sass.src, css);
  gulp.watch(path.js.src, js);
  gulp.watch(['*.*', 'dist/css/*.css', 'dist/images/*.*', 'dist/js/*.*']).on('change', browserSync.reload);
  gulp.watch('src/img/*', compress());
  done();
}


// export tasks
exports.compress = compress;
exports.sprite = sprite;
exports.css = css;
exports.js = js;
exports.watch = watch;
exports.html = html;
exports.default = parallel(css, watch, html);