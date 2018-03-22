var plato = require('es6-plato');

module.exports = function(gulp, config) {
    'use strict';

    gulp.task('report', function(cb) {
        plato.inspect(config.srcs.scripts, config.dests.reports.plato, {
            title: config.title,

            eslint: {
                configFile: '.eslintrc.js',
                // Overwrite es6-plato defaults
                rules: {},

                parserOptions: {
                    ecmaFeatures: {
                        modules: false
                    }
                }
            }
        }, function() {
            cb();
        });
    });
};
