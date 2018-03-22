var docs = require('./tasks/docs'),
    report = require('./tasks/report'),
    min = require('./tasks/min'),
    test = require('./tasks/test'),
    config = require('./config.json');

module.exports = function(gulp, title) {
    'use strict';

    config.title = title;
    config.templateBase = __dirname;

    min(gulp, config);
    report(gulp, config);
    docs(gulp, config);
    test(gulp);

    gulp.task('dev', ['tdd']);

    return gulp;
};
