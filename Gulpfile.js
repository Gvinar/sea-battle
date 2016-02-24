'use strict';
let gulp = require("gulp");
let jshint = require('gulp-jshint');
let stylish = require('jshint-stylish');
let mocha = require('gulp-mocha'); // jshint ignore: line
let env = require('gulp-env');
let bower = require('gulp-bower');

let envs = env.set({});

gulp.task("bower", () => {
	return bower()
		.pipe(gulp.dest("./client/libs"));
});

gulp.task("unitTests", () => {
	return gulp.src("./test/unit/**/*.js")
		.pipe(envs)
		.pipe(mocha({
			ui: "bdd",
			timeout: 30000
		}))
		.pipe(envs.reset);
});

gulp.task("integrTests", () => {
	return gulp.src("./test/integration/**/*.js")
		.pipe(envs)
		.pipe(mocha({
			ui: "bdd",
			timeout: 30000
		}))
		.pipe(envs.reset);
});

gulp.task("jshint", () => {
	return gulp.src("./**/*.js")
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task("default", ["jshint"]);