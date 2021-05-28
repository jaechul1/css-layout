import gulp from "gulp";
import del from "del";
import ws from "gulp-webserver";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";

sass.compiler = require("node-sass");

const routes = {
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    dest: "dist/css",
  },
};

const clean = () => del(["dist"]);

const webserver = () =>
  gulp.src("dist").pipe(ws({ livereload: true, open: true }));

const styles = () =>
  gulp
    .src(routes.scss.src)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
      })
    )
    .pipe(gulp.dest(routes.scss.dest));

const watch = () => {
  gulp.watch(routes.scss.watch, styles);
};

const prepare = gulp.series([clean]);

const assets = gulp.series([styles]);

const post = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, post]);
export const build = gulp.series([prepare, assets]);
