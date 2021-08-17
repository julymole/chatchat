"use strict";

import {paths} from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import sass from "gulp-sass";
import mincss from "gulp-clean-css";
import groupmedia from "gulp-group-css-media-queries";
import autoprefixer from "autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import yargs from "yargs";
import inlineSVG from "postcss-inline-svg";
import objectFitImages from "postcss-object-fit-images";
import atImport from "postcss-import";
import postcss from "gulp-postcss";


const argv = yargs.argv,
	production = !!argv.production;
let postCssPlugins = [
	atImport(),
	inlineSVG(),
	autoprefixer({
		cascade: false,
		grid: true
	}),
	objectFitImages(),

];

gulp.task("styles", () => {
	return gulp.src(paths.styles.src)
		.pipe(gulpif(!production, sourcemaps.init()))
		.pipe(sass({
			style: 'compressed',
			errLogToConsole: false,
			onError: function(err) {
				console.log(notify().write(err));
			}
		}))
		// .pipe(groupmedia())
		.pipe(postcss(postCssPlugins))
		.pipe(gulpif(production, mincss({
			compatibility: "ie8", level: {
				1: {
					specialComments: 0,
					removeEmpty: true,
					removeWhitespace: true
				},
				2: {
					mergeMedia: true,
					removeEmpty: true,
					removeDuplicateFontRules: true,
					removeDuplicateMediaBlocks: true,
					removeDuplicateRules: true,
					removeUnusedAtRules: false
				}
			}
		})))
		.pipe(gulpif(production, rename({
			suffix: ".min"
		})))
		.pipe(plumber.stop())
		.pipe(gulpif(!production, sourcemaps.write("./")))
		.pipe(gulp.dest(paths.styles.build))
		.pipe(debug({
			"title": "CSS files"
		}))
		.pipe(browsersync.stream());
});
