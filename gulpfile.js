const gulp = require('gulp')

gulp.task('copySrc', () => {
    gulp
        .src('src/**/*')
        .pipe(gulp.dest('dist/src'))
})

gulp.task('copyOthers', () => {
    gulp
        .src(['*', '!dist', '!node_modules'])
        .pipe(gulp.dest('dist/'))
})

gulp.task('default', ['copySrc', 'copyOthers'])