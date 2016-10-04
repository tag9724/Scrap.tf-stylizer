var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var gulp_sync_task = require('gulp-sync-task');

var src = 'src';
var bin = 'bin';

console.log("\033[31m Mettre a jour le fichier global.css pour chaque nouvelle version !!! \033");

gulp.task('clean', function () {
    console.log("[START] Clear bin folder ...");

    return gulp.src(bin + '/**/*.*', {
            read: false
        })
        .pipe(plugins.clean());
});

gulp.task('copy', function () {
    console.log("[COPY] cp ./src/ to ./bin/ ...");

    return gulp.src(src + '/**/*.*')
        .pipe(gulp.dest('bin'));
});

gulp.task('html', function () {
    console.log("[HTML] minify ...");

    return gulp.src(bin + '/**/*.html')
        .pipe(plugins.htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('bin'));
});

gulp.task('js', function () {
    console.log("[JS] minify ...");

    return gulp.src(bin + '/**/*.js')
        .pipe(plugins.jsmin())
        .pipe(gulp.dest(bin));
});

/* Package Project for chrome & Firefox & Opera */

gulp.task('zipSRC', () => {

    console.log("[ZIP] src folder to .zip ...");

    return gulp.src('src/**/*')
        .pipe(plugins.zip('src.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('zipBin', () => {

    console.log("[ZIP] bin folder to .zip ...");

    return gulp.src('bin/**/*')
        .pipe(plugins.zip('bin.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('zipNex', () => {

    console.log("[ZIP] src folder to .nex ...");

    return gulp.src('src/**/*')
        .pipe(plugins.zip('src.nex'))
        .pipe(gulp.dest('./'));
});

gulp.task('zip', ['zipSRC', 'zipBin', 'zipNex']);

/*
  DON'T ADD CSS MINIFICATION ANYMORE
*/

gulp.task('default', gulp_sync_task('clean', 'copy', 'html', 'js', 'zip'));
