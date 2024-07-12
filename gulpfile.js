// npm i gulp gulp-autoprefixer gulp-clean-css gulp-sass node-sass sass
import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import nodeSass from 'node-sass';

const sass = gulpSass(dartSass); // SCSS/SASS

// sources
const paths = {
    styles: {
        src: {
            custom: './scss/**/*.scss',
        },
        dist: './css'
    }
}

sass.compiler = nodeSass

// styles custom optimize
function CustomStyles() {
    return gulp.src(paths.styles.src.custom)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ['> 1%'], cascade: false }))
        .pipe(cleanCSS({ level: 2 }))
        .pipe(gulp.dest(paths.styles.dist))
}

// watchin' onchange
function watch() {
    gulp.watch(paths.styles.src.custom, CustomStyles)
}

gulp.task('styles', CustomStyles)
gulp.task('watch', watch)

gulp.task('build', gulp.parallel(CustomStyles))
gulp.task('default', gulp.series('build', 'watch'))
