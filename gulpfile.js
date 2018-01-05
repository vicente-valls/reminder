'use strict';

const gulp = require('gulp');
const swagger = require('gulp-swagger');

gulp.task('validate-swagger', () => {
    return gulp
    .src(['apidoc.yml'])
    .pipe(swagger('schema.yaml'))
    .once('error', (error) => {
        console.log(error);
        process.exit(1);
    })
    .once('end', () => {
        process.exit();
    });
});
