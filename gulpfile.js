'use strict';

const sass = require('gulp-sass');
const rigger = require('gulp-rigger');
const gutil = require('gulp-util');
const notify = require('gulp-notify');
const rename = require("gulp-rename");
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const prettify = require('gulp-html-prettify');
const csso = require('gulp-csso');
const csscomb = require('gulp-csscomb');
const sourcemaps=require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const pump = require('pump');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const newer = require ('gulp-newer');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch("./src/**/*.*").on('change', browserSync.reload);
    gulp.watch(['./src/templates/**/*.html', './src/pages/**/*.html'], ['template']);
    gulp.watch(['./src/sass/**/*.scss'], ['sass']);
});

gulp.task('sass', function () {
    gulp.src(['./src/sass/**/*.scss', './src/sass/**/*.sass'])
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle:'expanded'
        }).on('error', gutil.log))
        .on('error', notify.onError())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/css/'))
        .pipe(browserSync.stream());
});

gulp.task('template', function () {
    gulp.src('./src/pages/**/*.tmpl.html')
        .pipe(rigger())
        .pipe(rename(function (path) {
            path.basename = path.basename.split('.')[0];
            path.extname = ".html"
        }))
        .pipe(gulp.dest('./src/pages/'))
});

gulp.task('html-prettify', function() {
    gulp.src('./src/pages/*.html')
        .pipe(prettify({indent_char: ' ', indent_size: 2}))
        .pipe(gulp.dest('./build/'))
});

gulp.task('comb-css', function() {
    return gulp.src('./src/css/*.css')
        .pipe(csscomb())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('prefixer-css', function() {
    gulp.src('./src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 25 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./build/css'))
});

gulp.task('sourcemap-css', function () {
    return gulp.src('./src/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('minify-css', function () {
    return gulp.src('./src/css/*.css')
        .pipe(csso())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('minify-js', function (cb) {
    pump([
            gulp.src('./src/js/*.js'),
            uglify(),
            gulp.dest('./build/js')
        ],
        cb
    );
});

gulp.task('concat-js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('minify-img', function() {
    gulp.src('./src/img/**')
        .pipe(newer('./build/img'))
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'));
    gulp.src('./src/pic/**')
        .pipe(newer('./build/pic'))
        .pipe(imagemin())
        .pipe(gulp.dest('./build/pic'));
});

gulp.task('server', ['browser-sync', 'sass', 'template']);
gulp.task('build', ['html-prettify', 'prefixer-css', 'comb-css', 'minify-js', 'concat-js', 'minify-img']);