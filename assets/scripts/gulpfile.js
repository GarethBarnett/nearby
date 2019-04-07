let gulp = require("gulp");
let sass = require("gulp-sass");
let browserSync = require("browser-sync").create();

let scssPath = "./assets/styles/sass/**/*.scss"; //globbing
let cssPath = "./assets/styles/css";



function style(){
	return (
		gulp
		.src(scssPath)
		.pipe(sass())
		.on("error", sass.logError)
		.pipe(gulp.dest(cssPath))
		.pipe(browserSync.stream())
	);
	
}

function update(done){
	browserSync.reload();
	done();
}

function mywatch(){

	browserSync.init({
		server: { baseDir: "./" }
	});

	gulp.watch("*.html", update)
	gulp.watch(scssPath, style);
}

exports.sass = style;

exports.mywatcher = mywatch;