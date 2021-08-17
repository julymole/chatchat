"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import yargs from "yargs";
import nunjucks from 'gulp-nunjucks-render';
import data from 'gulp-data';
import fs from 'fs';
import  prettify from 'gulp-prettify';

const argv = yargs.argv,
    production = !!argv.production;

const getData = function () {
    let dataPath = './global.json';
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
};

gulp.task("views", () => {
    return gulp.src('./src/templates/pages/*.html')
        .pipe(data(getData))
        .pipe(nunjucks({
            path: ['./src/templates']
        }))
        .pipe(prettify({
            indent_inner_html: false,
            preserve_newlines: true,
            unformatted: []
        }))
        .pipe(gulpif(production, replace(".css", ".min.css")))
        .pipe(gulpif(production, replace("rel=\"stylesheet\" type=\"text/css\" as=\"\"", "rel=\"stylesheet preload\" type=\"text/css\" as=\"style\"")))
        .pipe(gulpif(production, replace(".js", ".min.js")))
        .pipe(gulp.dest(paths.views.build))
        .pipe(browsersync.stream());
});
