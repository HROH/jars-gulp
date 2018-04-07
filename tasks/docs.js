var path = require('path'),
    del = require('del'),
    jsdoc3 = require('gulp-jsdoc3'),
    jsdocConfig = require('../jsdoc.conf.json');

module.exports = function(gulp, config) {
    'use strict';

    jsdocConfig.systemName = config.title;
    jsdocConfig.templates.copyright = config.author;

    gulp.task('clean:docs', function() {
        return del([config.dels.docs]);
    });

    gulp.task('docs', ['clean:docs'], function(cb) {
        gulp.src(config.srcs.scripts, {
            read: false
        }).pipe(jsdoc3(jsdocConfig, cb));
    });
};
