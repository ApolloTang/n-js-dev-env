var gulp = require('gulp'),
    jade = require('gulp-jade');
    browserify = require('browserify'),
    vinylSource = require('vinyl-source-stream'),

gulp.task('jade', function(){
    return gulp.src('src/templates/**/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('builds/development'));
});

gulp.task('js', function(){
    return browserify({
        entries: ['./src/js/main.js'],
        debug: true // generate source map
    })
    .bundle()
    .pipe(vinylSource('app.js'))
    .pipe(gulp.dest('builds/development'));
});

