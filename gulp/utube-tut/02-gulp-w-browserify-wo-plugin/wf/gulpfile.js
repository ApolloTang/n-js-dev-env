var gulp=require('gulp'),
    browserify = require('browserify'),
    vinylSource = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify');

gulp.task('js', function(){

        return browserify( {
            entries: ['./js/main.js'],
            debug: true // generate source map
        })
        .bundle()// Include source map
        .pipe(vinylSource('app.js')) // <-
                                // Gulp work w vinyl-source-obj, it
                                // does not undestand browserify bundle directly.
                                // Thus, need vinyl-source-stream plugin to translate
                                // browserify output to what gulp stream understand
                                //
                                //       @Parameter: is the desire name of the output file
        // .pipe(uglify())          // << error because uglify does not support streaming.
                                    //      Uglify require the entire content of the output to do its work.
                                    //      Thus, we need to use gulp-streamify. Gulp-streamify
                                    //      save entire stream output in a buffer bf calling uglify plugin.
        .pipe(streamify( uglify())) //      [!] note that uglify will take away source map
        .pipe(gulp.dest('.'));
});
