/*
  copy.js
  ===========
  copies images and javascript folders to public
*/

const gulp = require('gulp')

const config = require('./config.json')

gulp.task('copy-assets', function () {
  return gulp.src([
    `${config.paths.assets}/**`,
    `!${config.paths.assets}/sass/**`
  ])
    .pipe(gulp.dest(config.paths.public))
})

gulp.task('copy-country-and-territory-autocomplete', function () {
  return gulp.src([
    'node_modules/govuk-country-and-territory-autocomplete/dist/*.js',
    'node_modules/govuk-country-and-territory-autocomplete/dist/*.css',
    'app/data/location-autocomplete-canonical-list.json',
    'app/data/location-autocomplete-graph.json'
  ])
    .pipe(gulp.dest(`${config.paths.public}/govuk-country-and-territory-autocomplete/`))
})

gulp.task('copy-assets-documentation', function () {
  return gulp.src([
    `${config.paths.docsAssets}/**`,
    `!${config.paths.docsAssets}/sass/**`
  ])
    .pipe(gulp.dest(config.paths.public))
})

gulp.task('copy-assets-v6', function () {
  return gulp.src([
    `${config.paths.v6Assets}/**`,
    `!${config.paths.v6Assets}/sass/**`
  ])
    .pipe(gulp.dest(config.paths.public + '/v6'))
})
