'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps');

gulp.task('concatScripts', function(){
	return gulp.src([
		'./public/javascripts/jquery-2.1.4.js', 
		'./public/javascripts/underscore.js', 
		'./public/javascripts/foundation.min.js',
		'./public/javascripts/backbone.js',
		'./public/javascripts/typeahead.bundle.min.js',
		'./public/javascripts/lat-long.js'])
		.pipe(maps.init())
		.pipe(concat('all.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('minifyScripts', function(){
	return gulp.src('./public/javascripts/all.js')
		.pipe(uglify())
		.pipe(rename('all.min.js'))
		.pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('compileSass', function(){
	return gulp.src('./public/stylesheets/main.scss')
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('default', ['hello'], function(){
	console.log('default task');
});

//gulp concat: combines multiple files into one file