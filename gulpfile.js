const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const autoprefixer = require("autoprefixer");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const gulpif = require("gulp-if")
const sync = require("browser-sync").create();

const isProd = process.argv.includes('build');

const config = {
  src: './source/',
  dist: './dist/',
  html: {
    src: '**/*.html',
    dest: '/'
  },
  img: {
    icons: 'img/icons/*.svg',
    src: 'img/**/*',
    dest: 'img'
  },
  css: {
    src: 'sass/style.scss',
    watch: 'sass/**/*.scss',
    dest: 'css'
  },
  js: {
    src: 'js/script.js',
    watch: 'js/**/*.js',
    dest: 'js'
  }
};

// Styles

const styles = () => {
  return gulp.src(config.src + config.css.src)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(gulp.dest(config.dist + config.css.dest))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest(config.dist + config.css.dest))
    .pipe(sync.stream());
}

exports.styles = styles;

// Html

const html = () => {
  return gulp.src(config.src + config.html.src)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.dist));
}

// Scripts

const scripts = () => {
  return gulp.src(config.src + config.js.src)
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest(config.dist + config.js.dest))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Image

const images = () => {
  return gulp.src(config.src + config.img.src + '{jpg,png,svg}')
    .pipe(gulpif(isProd, imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
      .pipe(gulp.dest(config.dist + config.img.dest)));
}

exports.images = images;

// WebP

const createWebp = () => {
  return gulp.src(config.src + config.img.src + '{jpg,png}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest(config.dist + config.img.dest))
}

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src(config.src + config.img.icons)
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest(config.dist + config.img.dest))
}

exports.sprite = sprite;

// Copy

const copy = () => {
  return gulp.src([
      "source/fonts/*.{woff2,woff}",
      "source/*.ico"
    ],
    {
      base: config.src
    })
    .pipe(gulp.dest(config.dist))
}

exports.copy = copy;

// Clean

const clean = () => {
  return del(config.dist);
}

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: config.dist
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = done => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch(config.src + config.css.watch, gulp.series(styles));
  gulp.watch(config.src + config.js.src, gulp.series(scripts));
  gulp.watch(config.src + config.html.src, gulp.series(html, reload));
}

// Build

const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    copy,
    images,
    createWebp
  ));

exports.build = build;

// Default

exports.default = gulp.series(
  build,
  server,
  watcher,
);
