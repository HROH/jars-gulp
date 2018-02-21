'use strict';

var path = require('path'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    plato = require('plato'),
    del = require('del'),
    createKarmaServer = require('jars-karma').createServer,
    srcs = {
        scripts: 'src/**/*.js',
        min: 'min/**/*.js'
    },
    dests = {
        min: 'min',

        reports: {
            plato: 'reports/plato'
        }
    },
    dels = {
        min: 'min/**/*',

        docs: 'docs/**/*'
    },
    jsdocConfig = JSON.parse(require('fs').readFileSync(path.join(__dirname, 'jsdoc.conf.json'), 'utf8')),
    jshint = {
        options: JSON.parse(require('fs').readFileSync(path.join(__dirname, '.jshintrc'), 'utf8'))
    };
    
    jshint.globals = jshint.options.globals;
    delete jshint.options.globals;

    jsdocConfig.opts.template = path.join(__dirname, jsdocConfig.opts.template);

module.exports = function(gulp, title) {
    jsdocConfig.systemName = title;

    gulp.task('clean:min', function() {
        return del([dels.min]);
    });

    gulp.task('min', ['clean:min'], function() {
        return gulp.src(srcs.scripts)
            .pipe(plugins.uglify())
            .pipe(plugins.rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(dests.min));
    });

    gulp.task('min-gzip', ['min'], function() {
        return gulp.src(srcs.min)
            .pipe(plugins.tar('minified.tar'))
            .pipe(plugins.gzip())
            .pipe(gulp.dest(dests.min));
    });

    gulp.task('report', function(cb) {
        plato.inspect(srcs.scripts, dests.reports.plato, {
            title: title,

            jshint: jshint,

            noempty: true
        }, function () {
            cb();
        });
    });

    gulp.task('clean:docs', function() {
        return del([dels.docs]);
    });

    gulp.task('docs', ['clean:docs'], function(cb) {
        gulp.src(srcs.scripts, {
            read: false,
        }).pipe(plugins.jsdoc3(jsdocConfig, cb));
    });

    /**
     * Run test once and exit
     */
    gulp.task('test', createKarmaServer(true));

    /**
     * Watch for file changes and re-run tests on each change
     */
    gulp.task('tdd', createKarmaServer());

    gulp.task('scripts', ['report', 'docs', 'min-gzip']);

    gulp.task('watch', function() {
        gulp.watch(srcs.scripts, ['scripts']);
    });

    gulp.task('dev', ['tdd', 'scripts', 'watch']);

    return gulp;
};
