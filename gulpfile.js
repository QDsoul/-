const gulp = require("gulp");

gulp.task("copyHtml", function () {
    return gulp.src(["*.html"])
        .pipe(gulp.dest("dist/html"))
        .pipe(connect.reload());
})

gulp.task("javascript", function () {
    return gulp.src(["*.js", "!gulpfile.js"])
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
})

const scss = require("gulp-sass-china");
const rename = require("gulp-rename");
const minifyCss = require("gulp-minify-css");

gulp.task("scssIndex", function () {
    return gulp.src("stylesheet/index.scss")
        .pipe(scss())
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCss())
        .pipe(rename("index_min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})

gulp.task("scssReset", function () {
    return gulp.src("stylesheet/reset.scss")
        .pipe(scss())
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCss())
        .pipe(rename("reset_min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})

gulp.task("iconfont", function(){
    return gulp.src("iconfont/**/*")
    .pipe(gulp.dest("dist/iconfont"))
    .pipe(connect.reload());
})

gulp.task("image", function () {
    return gulp.src("images/*.{jpg,png}")
        .pipe(gulp.dest("dist/images"))
        .pipe(connect.reload());
})

gulp.task("data", function () {
    return gulp.src(["*.json", "!package.json", "!package-lock.json"])
        .pipe(gulp.dest("dist/json"))
        .pipe(connect.reload());
})

gulp.task("build", ["copyHtml", "javascript", "scssIndex","scssReset" , "image", "data", "iconfont"]);

const connect = require("gulp-connect");

gulp.task("server", function () {
    connect.server({
        root: "dist",
        prot: 8080,
        livereload: true
    })
})

gulp.task("watch", function () {
    gulp.watch(["*.html"], ["copyHtml"]);
    gulp.watch(["*.js", "!gulpfile.js"], ["javascript"]);
    gulp.watch("stylesheet/index.scss", ["scssIndex"]);
    gulp.watch("stylesheet/reset.scss", ["scssReset"]);
    gulp.watch("images/*.{jpg,png}",[ "image"]);
    gulp.watch(["*.json", "!package.json", "!package-lock.json"], ["data"]);
    gulp.watch("iconfont/**/*",[ "iconfont"]);
})

gulp.task("default", ["watch", "server"]);