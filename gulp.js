// Importing required modules
const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");

// Task: Compile SASS to CSS
function compileSass() {
  return gulp.src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
}

// Task: Add vendor prefixes
function prefixCss() {
  return gulp.src("dist/css/*.css")
    .pipe(autoprefixer({
      overrideBrowserslist: ["last 2 versions"],
      cascade: false,
    }))
    .pipe(gulp.dest("dist/css"));
}

// Task: Minify and optimize CSS
function minifyCss() {
  return gulp.src("dist/css/*.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist/css"));
}

// Task: Watch for changes in SASS files
function watchFiles() {
  gulp.watch("src/scss/**/*.scss", gulp.series(compileSass, prefixCss, minifyCss));
}

// Exporting tasks
module.exports = {
  compileSass,
  prefixCss,
  minifyCss,
  watchFiles
};
