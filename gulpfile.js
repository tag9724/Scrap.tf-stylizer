var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var gulp_sync_task = require('gulp-sync-task');

var src = 'src';
var bin = 'bin';

gulp.task('clean', function() {
    console.log("[START] Clear bin folder ...");

    return gulp.src(bin + '/**/*.*', {
            read: false
        })
        .pipe(plugins.clean());
});

gulp.task('copy', function() {
    console.log("[COPY] cp ./src/ to ./bin/ ...");

    return gulp.src(src + '/**/*.*')
        .pipe(gulp.dest('bin'));
});

gulp.task('html', function() {
    console.log("[HTML] minify ...");

    return gulp.src(bin + '/**/*.html')
        .pipe(plugins.htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('bin'));
});

gulp.task('js', function() {
    console.log("[JS] minify ...");

    gulp.src(bin + '/**/*.js')
        .pipe(plugins.jsmin())
        .pipe(gulp.dest(bin));
});

/*
  DON'T ADD CSS MINIFICATION ANYMORE
*/

gulp.task('minify', ['html', 'js']);
gulp.task('default', gulp_sync_task('clean', 'copy', 'minify'));
