var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('sass', function() {
    return sass('./src/styles/')
    .on('error', function (err) { console.error('Error!', err.message); })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dest/styles/'))
    .pipe( rename( {extname: '.min.css'} ) )
    .pipe(minifyCss())
    .pipe(gulp.dest('dest/styles/'));
});

gulp.task('process-scripts', function(){
    return gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dest/js/'))
    .pipe(rename( {extname: '.min.js'}))
    .pipe(uglify())
    .pipe(gulp.dest('dest/js/'));
});

gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['process-scripts']);
});
