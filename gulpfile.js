let gulp = require('gulp');
	  server = require('gulp-server-livereload');
	  sass = require('gulp-sass');
	  prefix = require('gulp-autoprefixer');
	  useref = require('gulp-useref');
	  gulpif = require('gulp-if');
	  uglify = require('gulp-uglify');
	  csso = require('gulp-csso');
	  cleanDest = require('gulp-dest-clean');
	  changed = require('gulp-changed');
	  rimraf = require('rimraf');

gulp.task('start', () =>
	gulp.src('src')
		.pipe(server({
			open: true,
			livereload: true
		}))
);

gulp.task('rimraf', (cb) =>
   rimraf('./dist', cb)
);

gulp.task('style', () =>
	gulp.src('src/sass/**/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({
			versions: ['last 20 versions']
		}))
		.pipe(gulp.dest('src/css'))
);

gulp.task('watch', () =>
	gulp.watch('src/sass/**/*.sass', ['style'])
);

gulp.task('changed', () =>
    gulp.src('src/sass/**/*.sass')
        .pipe(changed('src/sass', {extension: '.sass'}))
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
);

gulp.task('sasstodist', () =>
  gulp.src(('./src/sass/**/*.sass'))
    .pipe(gulp.dest('dist/sass'))
);

gulp.task('csstodist', () =>
  gulp.src(('./src/css/**/*.css'))
    .pipe(gulp.dest('dist/css'))
);

gulp.task("devbuild", () =>
	gulp.src("src/*.html")
		.pipe(useref())
		.pipe(gulpif("*.css", csso()))
		.pipe(gulpif("*.js", uglify()))
		.pipe(gulp.dest('src'))
);

gulp.task("build", () =>
	gulp.src("src/*.html")
		.pipe(useref())
		.pipe(gulpif("*.css", csso()))
		.pipe(gulpif("*.js", uglify()))
		.pipe(gulp.dest('dist'))
);

gulp.task('default', ['start', 'watch', 'changed']);
