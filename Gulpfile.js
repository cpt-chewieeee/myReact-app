var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var jetpack = require('fs-jetpack');
var projectDir = jetpack;
var destDir = projectDir.cwd('./dist');
var path = {
	HTML: 'app/index.html',
	MINIFIED_OUT: 'build.min.js',
	OUT: 'build.js',
	ENTRY_POINT: './app/index.js',
	DEST_SRC: 'dist/src',
	DEST_BUILD: 'dist/build',
	DEST: 'dist'
};
gulp.task('clean', function(){
	return destDir.dirAsync('.', {empty: true});
});
gulp.task('copy', ['clean'], function(){
	gulp.src(path.HTML)
		.pipe(gulp.dest(path.DEST));
});
gulp.task('watch', function(){
	gulp.watch(path.HTML, ['copy']);
	var watcher = watchify(browserify({
		entries: [path.ENTRY_POINT],
		transform: [reactify],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	}));
	return watcher.on('update', function(){
		watcher.bundle()
			.pipe(source(path.OUT))
			.pipe(gulp.dest(path.DEST_SRC));
			console.log('Updated');
	})
	.bundle()
	.pipe(source(path.OUT))
	.pipe(gulp.dest(path.DEST_SRC));
});
gulp.task('build', function(){
	browserify({
		entries: [path.ENTRY_POINT],
		transform: [reactify]
	})
	.bundle()
	.pipe(source(path.MINIFIED_OUT))
	.pipe(streamify(uglify(path.MINIFIED_OUT)))
	.pipe(gulp.dest(path.DEST_SRC));
});
gulp.task('replaceHTML', function(){
	gulp.src(path.HTML)
	.pipe(htmlreplace({
		'js': 'build/' + path.MINIFIED_OUT
	}))
	.pipe(gulp.dest(path.DEST));
});
gulp.task('production', ['replaceHTML', 'build']);
gulp.task('default', ['watch']);