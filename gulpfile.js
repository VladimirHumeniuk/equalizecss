let gulp = require('gulp');
	  sass = require('gulp-sass');
	  prefix = require('gulp-autoprefixer');
	  useref = require('gulp-useref');
	  gulpif = require('gulp-if');
	  uglify = require('gulp-uglify');
	  cleanDest = require('gulp-dest-clean');
	  rimraf = require('rimraf');
    cleanCSS = require('gulp-clean-css');


gulp.task('rimraf', (cb) =>
   rimraf('./dist', cb)
);

gulp.task('style', () =>
	gulp.src('src/**/*.{sass,scss}')
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({
			versions: ['last 4 versions']
		}))
		.pipe(gulp.dest('src/css'))
);

gulp.task("build", () =>
	gulp.src("src/*.html")
		.pipe(useref())
		.pipe(gulpif("*.css", cleanCSS()))
		.pipe(gulp.dest('dist'))
);

gulp.task('default');
