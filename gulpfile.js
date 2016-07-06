var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  shell = require('gulp-shell');


gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee jade',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('mount', ['umount'], shell.task([
  'sshfs ubuntu@qykj.com:/home/ubuntu/pdf ./public/pdf'
]))

gulp.task('umount', shell.task([
  'sudo umount ./public/pdf'
]))

gulp.task('model', shell.task([
  'cd app && sequelize-auto -h qykj.com -d qykj -u root -x admin123 -p 3306 -e mysql && rm models/sessions.js',
]))

gulp.task('default', [
  'develop'
]);
