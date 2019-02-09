"use strict";

var DEV = false,
    CDN = false,
    CORDOVA = false;
    
var OUTPUT_DIR = "www";    
var EXTRA_STATIC;

// Keep versions in sync with packages.json
var JQ_CDN_VERSION = "3.3.1",
    BOOTSTRAP_CDN_VERSION = "3.4.0",
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
    return del(OUTPUT_DIR + "/**/*");
});

gulp.task("copy-static", function() {
    var list = [ "src-static/**/*" ];
    if(EXTRA_STATIC)
        list.push(EXTRA_STATIC);

    gulp
        .src(list)
        .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task("copy-vendor", function() {
    return merge(
        gulp.src("node_modules/jquery/dist/" + jqueryFile()).pipe(gulp.dest(OUTPUT_DIR + "/vendor")),
        gulp.src("node_modules/knockout/build/output/" + knockoutFile()).pipe(gulp.dest(OUTPUT_DIR + "/vendor")),
        gulp.src("node_modules/bootstrap/dist/js/" + bootstrapFile("js")).pipe(gulp.dest(OUTPUT_DIR + "/vendor/bootstrap/js")),
        gulp.src("node_modules/bootstrap/dist/css/" + bootstrapFile("css")).pipe(gulp.dest(OUTPUT_DIR + "/vendor/bootstrap/css"))
    );        
});

gulp.task("index.html", function() {
    del.sync(OUTPUT_DIR + "/index.html");

    return gulp
        .src("src/index.jade")
        .pipe(jade({
            locals: { 
                vendor: vendorUrls(),
                cordova: CORDOVA
            },
            pretty: DEV
        }))
        .on("error", antiCrash)
        .pipe(gulp.dest(OUTPUT_DIR))
        .pipe(connect.reload());
});

gulp.task("app.js", function() {
    del.sync(OUTPUT_DIR + "/app.js");

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
        .pipe(gulp.dest(OUTPUT_DIR))
        .pipe(connect.reload());
});

gulp.task("app.css", function() {
    del.sync(OUTPUT_DIR + "/app.css");

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
        .pipe(gulp.dest(OUTPUT_DIR))
        .pipe(connect.reload());
});

gulp.task("build", [ "index.html", "app.js", "app.css" ]);

gulp.task("zip", function() {
	return gulp.src(OUTPUT_DIR + "/**/*", { nodir: true })
		.pipe(zip("dist.zip"))
		.pipe(gulp.dest(OUTPUT_DIR));    
});

gulp.task("dev", function(callback) {
    OUTPUT_DIR = "dist-dev";
    DEV = true;
    gulp.watch("src/**/*.jade", [ "index.html" ]);
    gulp.watch("src/**/*.js", [ "app.js" ]);
    gulp.watch("src/**/*.less", [ "app.css" ]);
    connect.server({
        root: OUTPUT_DIR,
        livereload: true
    });
    runSequence("clean", [ "copy-vendor", "copy-static", "build" ], callback);
});

gulp.task("dist-web", function(callback) {
    OUTPUT_DIR = "docs";
    EXTRA_STATIC = "src-web/**/*";
    CDN = true;
    runSequence("clean", [ "copy-static", "build" ], callback);
});

gulp.task("dist-cordova", function(callback) {
    OUTPUT_DIR = "dist-cordova";
    EXTRA_STATIC = "src-cordova/**/*";
    CORDOVA = true;
    runSequence("clean", [ "copy-vendor", "copy-static", "build"], "zip", callback);
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
