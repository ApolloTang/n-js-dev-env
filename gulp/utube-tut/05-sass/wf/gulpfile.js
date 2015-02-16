var gulp = require('gulp'),
    jade = require('gulp-jade');
    browserify = require('browserify'),
    vinylSource = require('vinyl-source-stream'),
    uglify = require('gulp-uglify')
    streamify = require('gulp-streamify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps')

    gulpif = require('gulp-if');

var env = process.env.NODE_ENV || 'development';
var outputDir = 'builds/development';

gulp.task('jade', function(){
    return gulp.src('src/templates/**/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(outputDir));
});

gulp.task('js', function(){
    return browserify({
        entries: ['./src/js/main.js'],
        debug: env === 'development' // only include source map if NODE_ENV is set 'development'
    })
    .bundle()
    .pipe(vinylSource('app.js')) // <-
                    // Gulp work w vinyl-source-obj, it
                    // does not undestand browserify bundle directly.
                    // Thus, need vinyl-source-stream plugin to translate
                    // browserify output to what gulp stream understand
                    //       @Parameter: is the desire name
    // .pipe(uglify())          // << error because uglify does not support streaming.
                                //      Uglify require the entire content of the output to do its work.
                                //      Thus, we need to use gulp-streamify. Gulp-streamify
                                //      save entire stream output in a buffer bf calling uglify plugin.
    .pipe(
        gulpif( env === 'production', streamify(uglify())) // only uglify on production enviroment
     )
    .pipe(gulp.dest(outputDir));
});

gulp.task('sass', function(){
    var config = {};
    console.log(env);
    if (env === 'development') { config.writeSrcMap = true; }
    if (env === 'production') { config.writeSrcMap = false; }
    console.log (config.writeSrcMap)

    return gulp.src('src/sass/main.scss')
    .pipe(sourcemaps.init())   // <--- sourcemaps initialize
    .pipe(sass())
    .pipe( gulpif( config.writeSrcMap, sourcemaps.write()))
    // .pipe( gulpif( false, sourcemaps.write()))
    .pipe(gulp.dest(outputDir));
});
