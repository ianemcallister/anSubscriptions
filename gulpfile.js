/* 	GULP FILE
*
*	This is the gulp file that facilitates the developement enviornment.
*/

//define dependenceis
var gulp 	= require('gulp');						//build tools
//var autoprefixer = require('gulp-autoprefixer');	//allows for customization to various browsers
//var browserSync = require('browser-sync').create();	//allows for live updating
//var jasmine = require('gulp-jasmine-phantom'); 		//unit testing facilitation
//var concat = require('gulp-concat');				//will help shrink our public files
//var concatCss = require('gulp-concat-css');			//concatenates CSS into a single file
//var uglify = require('gulp-uglify');				//minifies public javascript
//var sourcemaps = require('gulp-sourcemaps');		//helps place files that are minified
//var ngAnnotate = require('gulp-ng-annotate');		//helps with angular scrips




/*
*	DIST
*
*	This defines a single task to run the primary gulp functions.
*/
gulp.task('dist', [
	'copy-html'//,
	//'styles',
	//'scripts',
	//'copy-images'
]);


/*
*	COPY-HTML
*
*	This defines how html files are copied into the distribution file.
*/
gulp.task('copy-html', function() {
	//copy the index file
	gulp.src('index.html')
		.pipe(gulp.dest('dist'));
	gulp.src('views/**/*.htm')
		.pipe(gulp.dest('dist/views'));
});