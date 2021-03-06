/* Jules Gareth Jason */
let gulp = require("gulp");
let sass = require("gulp-sass");
let browserSync = require("browser-sync").create();
let autoprefixer = require('gulp-autoprefixer');
let scssPath = "./assets/styles/sass/**/*.scss"; //globbing
let cssPath = "./assets/styles/css";

/* Jules */
gulp.task('prefix', () =>
	gulp.src('./assets/styles/css/main.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./assets/styles/css/'))
);
/* Jules */

/* Gareth */
function style() {
	return (
		gulp
			.src(scssPath)
			.pipe(sass())
			.on("error", sass.logError)
			.pipe(gulp.dest(cssPath))
			.pipe(browserSync.stream())
	);

}
/* Gareth */

/* Jason */
function update(done) {
	browserSync.reload();
	done();
}

function mywatch() {

	browserSync.init({
		server: { baseDir: "./" }
	});

	gulp.watch("*.html", update);
	gulp.watch("./assets/scripts/*.js", update);
	gulp.watch(scssPath, style);
}
/* Jason */
exports.sass = style;

exports.mywatcher = mywatch;
/* Jules Gareth Jason */