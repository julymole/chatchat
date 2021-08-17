"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import debug from "gulp-debug";

gulp.task("static", () => {
	return gulp.src(paths.static.src)
		.pipe(gulp.dest(paths.static.dist))
		.pipe(debug({
			"title": "static end"
		}));
});
