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

gulp.task("scssLogin", function () {
    return gulp.src("stylesheet/login.scss")
        .pipe(scss())
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCss())
        .pipe(rename("login_min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})

gulp.task("scssRegister", function () {
    return gulp.src("stylesheet/register.scss")
        .pipe(scss())
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCss())
        .pipe(rename("register_min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})

gulp.task("scssProduct", function () {
    return gulp.src("stylesheet/product.scss")
        .pipe(scss())
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCss())
        .pipe(rename("product_min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})

gulp.task("iconfont", function(){
    return gulp.src("iconfont/**/*")
    .pipe(gulp.dest("dist/iconfont"))
    .pipe(connect.reload());
})

gulp.task("php", function(){
    return gulp.src("*.php")
    .pipe(gulp.dest("dist/php"))
    .pipe(connect.reload());
})

gulp.task("image", function () {
    return gulp.src("images/**/*")
        .pipe(gulp.dest("dist/images"))
        .pipe(connect.reload());
})

gulp.task("data", function () {
    return gulp.src(["*.json", "!package.json", "!package-lock.json"])
        .pipe(gulp.dest("dist/json"))
        .pipe(connect.reload());
})

gulp.task("build", ["copyHtml", "javascript", "scssIndex", "scssLogin", "scssRegister", "scssProduct", "image", "data", "iconfont", "php"]);

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
    gulp.watch("stylesheet/login.scss", ["scssLogin"]);
    gulp.watch("stylesheet/register.scss", ["scssRegister"]);
    gulp.watch("stylesheet/product.scss", ["scssProduct"]);
    gulp.watch("images/**/*",[ "image"]);
    gulp.watch(["*.json", "!package.json", "!package-lock.json"], ["data"]);
    gulp.watch("iconfont/**/*",[ "iconfont"]);
    gulp.watch("*.php", ["php"]);
})

gulp.task("default", ["watch", "server"]);