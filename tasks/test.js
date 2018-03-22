var jarsKarma = require('jars-karma');

module.exports = function(gulp) {
    'use strict';

    /**
     * Run test once and exit
     */
    gulp.task('test', jarsKarma.createServer(true));

    /**
     * Watch for file changes and re-run tests on each change
     */
    gulp.task('tdd', jarsKarma.createServer());
};
