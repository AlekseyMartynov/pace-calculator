"use strict";

var DEV = false,
    BOOTSTRAP_CDN_VERSION = "3.3.6",
    KO_CDN_VERSION = "3.4.0";

var
    browserify = require("browserify"),
    del = require("del"),
    merge = require("merge-stream"),
    runSequence = require("run-sequence"),
    vinylBuffer = require("vinyl-buffer"),
    vinylSource = require("vinyl-source-stream");

var gulp = require("gulp"),
    minifyCss = require("gulp-minify-css"),
    connect = require("gulp-connect"),
    jade = require("gulp-jade"),
    less = require("gulp-less"),
    uglify = require("gulp-uglify");


gulp.task("vendor", function() {
    if(!DEV)
        return del("www/vendor");

    return merge(
        gulp.src("node_modules/knockout/build/output/knockout-latest.debug.js").pipe(gulp.dest("www/vendor")),
        gulp.src("node_modules/bootstrap/dist/**/*.*").pipe(gulp.dest("www/vendor/bootstrap"))
    );
});

gulp.task("markup", function() {
    del.sync("www/index.html");

    return gulp
        .src("src/index.jade")
        .pipe(jade({
            locals: { vendor: vendorPaths() },
            pretty: DEV
        }))
        .on("error", antiCrash)
        .pipe(gulp.dest("www"))
        .pipe(connect.reload());
});

gulp.task("app.js", function() {
    del.sync("www/app.js");

    var bundler = browserify("app.js", {
        basedir: "src",
        debug: DEV
    });

    var stream = bundler
        .bundle()
        .on("error", antiCrash)
        .pipe(vinylSource("app.js"));

    if(!DEV) {
        stream = stream
            .pipe(vinylBuffer())
            .pipe(uglify());
    }

    return stream
        .pipe(gulp.dest("www"))
        .pipe(connect.reload());
});

gulp.task("app.css", function() {
    del.sync("www/app.css");

    var stream = gulp
        .src("src/app.less")
        .pipe(less())
        .on("error", antiCrash);

    if(!DEV) {
        stream = stream.pipe(minifyCss({
            processImport: false // prevent Google fonts redirect
        }));
    }

    return stream
        .pipe(gulp.dest("www"))
        .pipe(connect.reload());
});

gulp.task("build", [ "vendor", "markup", "app.js", "app.css" ]);

gulp.task("dev", function(callback) {
    DEV = true;
    gulp.watch("src/**/*.jade", [ "markup" ]);
    gulp.watch("src/**/*.js", [ "app.js" ]);
    gulp.watch("src/**/*.less", [ "app.css" ]);
    connect.server({
        root: "www",
        livereload: true
    });
    runSequence("build", callback);
});

function vendorPaths() {
    return {
        knockout: DEV
            ? "vendor/knockout-latest.debug.js"
            : "https://cdnjs.cloudflare.com/ajax/libs/knockout/" + KO_CDN_VERSION + "/knockout-min.js",

        bootstrap_css: DEV
            ? "vendor/bootstrap/css/bootstrap.css"
            : "https://maxcdn.bootstrapcdn.com/bootstrap/" + BOOTSTRAP_CDN_VERSION + "/css/bootstrap.min.css"
    };
}

function antiCrash(err) {
    console.log(err.toString());
    this.emit("end");
}