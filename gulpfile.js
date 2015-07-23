'use strict';
//working code
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps');

gulp.task('concatScripts', function(){
	return gulp.src([
		'./bower_components/jquery/dist/jquery.min.js',
		'./bower_components/foundation/js/foundation.min.js', 
		'./bower_components/typeahead.js/dist/typeahead.bundle.min.js',
		'./public/javascripts/underscore.js', 
		'./public/javascripts/backbone.js',
		'./public/javascripts/markerwithlabels.js',
		'./public/javascripts/lat-long.js',
		'./public/javascripts/park_model.js',
		'./public/javascripts/search_park_view.js',
		'./public/javascripts/user_model.js',])
		.pipe(maps.init())
		.pipe(concat('all.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('minifyScripts', ['concatScripts'],function(){
	return gulp.src('./public/javascripts/all.js')
		// .pipe(maps.init())
		.pipe(uglify())
		// .pipe(maps.init())
		.pipe(rename('all.min.js'))
		// .pipe(maps.write('./'))
		.pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('compileSass', function(){
	return gulp.src('./public/stylesheets/main.scss')
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('watchFiles', function(){
	gulp.watch('./public/stylesheets/**/*.scss', ['compileSass']);
	gulp.watch('./public/javascripts/lat-long.js', ['minifyScripts']);
	gulp.watch('./public/javascripts/park_model.js', ['minifyScripts']);
	gulp.watch('./public/javascripts/user_model.js', ['minifyScripts']);
});

gulp.task('serve', ['watchFiles']);

gulp.task('build', ['minifyScripts', 'compileSass']);

gulp.task('default', ['build']);