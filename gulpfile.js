"use strict";

var DEV = false,
    CDN = false;

// Keep versions in sync with packages.json
var JQ_CDN_VERSION = "1.11.3",
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
    uglify = require("gulp-uglify"),
    zip = require("gulp-zip");


gulp.task("clean", function() {
    return del("www/**/*");
});

gulp.task("copy-static", function() {
    gulp
        .src("src-static/**/*")
        .pipe(gulp.dest("www"));    
});

gulp.task("copy-cordova", function() {
    gulp
        .src("src-cordova/**/*")
        .pipe(gulp.dest("www"));
});

gulp.task("copy-vendor", function() {
    return merge(
        gulp.src("node_modules/jquery/dist/" + jqueryFile()).pipe(gulp.dest("www/vendor")),
        gulp.src("node_modules/knockout/build/output/" + knockoutFile()).pipe(gulp.dest("www/vendor")),
        gulp.src("node_modules/bootstrap/dist/js/" + bootstrapFile("js")).pipe(gulp.dest("www/vendor/bootstrap/js")),
        gulp.src("node_modules/bootstrap/dist/css/" + bootstrapFile("css")).pipe(gulp.dest("www/vendor/bootstrap/css"))
    );        
});

gulp.task("index.html", function() {
    del.sync("www/index.html");

    return gulp
        .src("src/index.jade")
        .pipe(jade({
            locals: { vendor: vendorUrls() },
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

gulp.task("build", [ "index.html", "app.js", "app.css" ]);

gulp.task("zip", function() {
	return gulp.src("www/**/*")
		.pipe(zip("www.zip"))
		.pipe(gulp.dest("www"));    
});

gulp.task("dev", function(callback) {
    DEV = true;
    gulp.watch("src/**/*.jade", [ "index.html" ]);
    gulp.watch("src/**/*.js", [ "app.js" ]);
    gulp.watch("src/**/*.less", [ "app.css" ]);
    connect.server({
        root: "www",
        livereload: true
    });
    runSequence("clean", [ "copy-vendor", "copy-static", "build" ], callback);
});

gulp.task("dist-web", function(callback) {
    CDN = true;
    runSequence("clean", [ "copy-static", "build" ], callback);
});

gulp.task("dist-cordova", function(callback) {
    runSequence("clean", [ "copy-vendor", "copy-static", "copy-cordova", "build"], "zip", callback);
});

function vendorUrls() {
    
    function jqueryUrl() {
        if(CDN)
            return "https://code.jquery.com/jquery-" + JQ_CDN_VERSION + ".min.js";
        return "vendor/" + jqueryFile();
    } 
    
    function knockoutUrl() {
        if(CDN)
            return "https://cdnjs.cloudflare.com/ajax/libs/knockout/" + KO_CDN_VERSION + "/knockout-min.js";
        return "vendor/" + knockoutFile();
    }
    
    function bootstrapUrl(kind) {
        var prefix = CDN ? "https://maxcdn.bootstrapcdn.com/bootstrap/" + BOOTSTRAP_CDN_VERSION : "vendor/bootstrap",
            postfix = kind + "/" + bootstrapFile(kind);
            
        return prefix + "/" + postfix;
    }
    
    return {
        jquery: jqueryUrl(),
        knockout: knockoutUrl(),
        bootstrap_css: bootstrapUrl("css"),
        bootstrap_js: bootstrapUrl("js"),
    };
}

function jqueryFile() {
    return "jquery" + (DEV ? "" : ".min") + ".js";
}

function knockoutFile() {
    return "knockout-latest" + (DEV ? ".debug" : "") + ".js";
}

function bootstrapFile(kind) {
    return "bootstrap" + (DEV ? "" : ".min") + "." + kind;
}

function antiCrash(err) {
    console.log(err.toString());
    this.emit("end");
}
