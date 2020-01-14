const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

gulp.task('server', function () {

	browserSync({
		server: {
			baseDir: "ups7write.github.io"
		}
	});

	gulp.watch("ups7write.github.io/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function () {
	return gulp.src("ups7write.github.io/sass/**/*.+(scss|sass)")
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.pipe(autoprefixer())
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest("ups7write.github.io/css"))
		.pipe(browserSync.stream());
});

gulp.task('watch', function () {
	gulp.watch("ups7write.github.io/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
});

gulp.task('default', gulp.parallel('watch', 'styles', 'server'));