var projectName= 'carousel_plugin'
var assetsDir = 'assets/';
var gulp = require('gulp');
var sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');
var uglify = require('gulp-uglify'),
    pump = require('pump');
var browserSync = require('browser-sync').create();

// Live reload
gulp.task('watch', ['sass'], function() {
    browserSync.init({
        proxy: "localhost:80/carouselPlugin"
    });
    gulp.watch('assets/scss/**/*.scss', ['sass']);
    gulp.watch('**/*.html').on('change', browserSync.reload);
});

// Compile sass to css
gulp.task('sass', function () {
    gulp.src('assets/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(assetsDir + 'css'))
        .pipe(browserSync.stream());
});

// CSS export: compact
gulp.task('cssbuild', function () {
    gulp.src([assetsDir + 'css/*.css', '!'+ assetsDir + 'css/*.min.css'])
        .pipe(cssmin({keepBreaks: true}))
        .pipe(gulp.dest(assetsDir + 'css'));
});

// CSS export: compressed
gulp.task('cssmin', function () {
    gulp.src([assetsDir + 'css/bootstrap_critical.css'])
        .pipe(cssmin({keepBreaks: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(assetsDir + 'css/'));
});

// JS minify
gulp.task('jsmin', function (cb) {
    pump([
            gulp.src(assetsDir + 'js/jquery.verticalCarousel.js'),
            uglify(),
            rename({ suffix: '.min' }),
            gulp.dest(assetsDir + 'js/')
        ],
        cb
    );
});

// Watch & reload
gulp.task('default', ['sass', 'watch']);