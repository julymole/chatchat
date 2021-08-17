"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import browsersync from "browser-sync";

gulp.task("serve", () => {
    browsersync.init({
        server: "./build/",
        port: 3000,
        notify: true,
		open: false
    });

    gulp.watch(paths.views.watch, gulp.parallel("views", reload));
    gulp.watch(paths.styles.watch, gulp.parallel("styles"));
    gulp.watch(paths.scripts.watch, gulp.parallel("scripts", reload));
    gulp.watch(paths.sprites.watch, gulp.parallel("sprites", reload));
    gulp.watch(paths.images.watch, gulp.parallel("images", reload));
    gulp.watch(paths.webp.watch, gulp.parallel("webp", reload));
    gulp.watch(paths.fonts.watch, gulp.parallel("fonts", reload));
});

function reload(done) {
    browsersync.reload();
    done();
}

