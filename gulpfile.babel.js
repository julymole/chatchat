"use strict";

import gulp from "gulp";

const requireDir = require("require-dir"),
    paths = {
        views: {
            src: [
                "./src/templates/",
            ],
            build: "./build/",
            watch: [
                "./src/templates/**/*.html"
            ]
        },
        styles: {
            src: "./src/styles/*.scss",
            build: "./build/styles/",
            watch: [
                "./src/styles/**/*.scss"
            ]
        },
        scripts: {
            src: "./src/scripts/index.js",
            build: "./build/scripts/",
            watch: [
                "./src/scripts/**/*.js"
            ]
        },
        images: {
            src: [
                "./src/images/**/*.{jpg,jpeg,png,gif,tiff,svg}",
                "!./src/images/favicon/*.{jpg,jpeg,png,gif,tiff}"
            ],
            build: "./build/images/",
            watch: "./src/images/**/*.{jpg,jpeg,png,gif,svg,tiff}"
        },
        webp: {
            src: [
                "./src/images/**/*.{jpg,jpeg,png,tiff}",
                "!./src/images/favicon/*.{jpg,jpeg,png,gif,tiff}"
            ],
            build: "./build/images/",
            watch: [
                "./src/images/**/*.{jpg,jpeg,png,tiff}",
                "!./src/images/favicon/*.{jpg,jpeg,png,gif,tiff}"
            ]
        },
        sprites: {
            src: "./src/images/svg/*.svg",
            build: "./build/images/sprites/",
            watch: "./src/images/svg/*.svg"
        },
        fonts: {
            src: "./src/fonts/**/*.{woff,woff2}",
            build: "./build/fonts/",
            watch: "./src/fonts/**/*.{woff,woff2}"
        },
        favicons: {
            src: "./src/images/favicon/*.{jpg,jpeg,png,gif}",
            build: "./build/images/favicons/",
        },
		static: {
			src: "./src/static/*.*",
			dist: "./build/"
		}
    };

requireDir("./gulp-tasks/");

export { paths };

export const development = gulp.series("clean",
    gulp.parallel(["views", "styles", "scripts", "images", "webp", "sprites", "fonts", "static"]),
    gulp.parallel("serve"));

export const prod = gulp.series("clean",
    gulp.series(["views", "styles", "scripts", "images", "webp", "sprites", "fonts", "favicons", "static"]));

export default development;

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';
