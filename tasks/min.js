var del = require('del'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    tar = require('gulp-tar'),
    gzip = require('gulp-gzip');

module.exports = function(gulp, config) {
    'use strict';

    gulp.task('clean:min', function() {
        return del([config.dels.min]);
    });

    gulp.task('min', ['clean:min'], function() {
        return gulp.src(config.srcs.scripts)
            .pipe(uglify())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(config.dests.min));
    });

    gulp.task('min-gzip', ['min'], function() {
        return gulp.src(config.srcs.min)
            .pipe(tar('minified.tar'))
            .pipe(gzip())
            .pipe(gulp.dest(config.dests.min));
    });
};
