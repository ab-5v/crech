var gulp = require('gulp');

var watch = require('gulp-watch');
var mocha = require('gulp-mocha');
var batch = require('gulp-batch');
var concat = require('gulp-concat');

gulp.task('concat', function() {
    return gulp
        .src([
            './src/*.js',
            './msc/export.js'
        ])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./'))
    ;
});

gulp.task('test', ['concat'], function() {
    return gulp
        .src('./test/spec/*.js')
        .pipe(mocha())
});

gulp.task('watch', function() {
    watch(['./src/*.js', './msc/*.js', 'test/spec/*.js', 'gulpfile.js'], batch(function (events, done) {
        gulp.start('default', done);
    }));
});

gulp.task('default', ['test']);
