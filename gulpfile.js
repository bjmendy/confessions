var gulp = require('gulp'),
	less = require('gulp-less'),
	watch = require('gulp-watch');

gulp.task('watch', function(){
	gulp.watch(['./server/public/styles/*.less'], ['compile-less']);
});

gulp.task('compile-less', function(){
	gulp.src('./server/public/styles/*.less')
		.pipe(less())
		.pipe(gulp.dest('./server/public/styles/'));
});

gulp.task('default', ['compile-less', 'watch']);