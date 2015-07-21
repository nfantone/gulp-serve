'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var path = require('path');
var eslint = require('gulp-eslint');

var paths = {
    es6: ['index.js', 'lib/**/*.js'],
    es5: 'dist',
    // Must be absolute or relative to source map
    sourceRoot: path.join(__dirname, '.')
};

gulp.task('eslint', function () {
    return gulp.src(paths.es6)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('babel', function () {
    return gulp.src(paths.es6, {base: '.'})
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.', { sourceRoot: paths.sourceRoot }))
        .pipe(gulp.dest(paths.es5));
});

gulp.task('watch', function() {
    gulp.watch(paths.es6, gulp.series('eslint', 'babel'));
});

gulp.task('default', gulp.series('babel'));
