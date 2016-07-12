var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  apidoc = require('gulp-apidoc'),
  open = require('gulp-open'),
  livereload = require('gulp-livereload'),
  shell = require('gulp-shell');

gulp.task('apidoc', function(done){
          apidoc({
            src: "app/",
            dest: "apidoc/"
          },done);
});

gulp.task('api', ['apidoc'],function(){
  gulp.src('apidoc/index.html')
  .pipe(open());
});

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

gulp.task('mount', shell.task([
  'sudo ls public/courseware || mkdir public/courseware && sshfs ubuntu@qykj.com:/home/ubuntu/courseware public/courseware'
]))

gulp.task('umount', shell.task([
  'sudo umount public/courseware'
]))

gulp.task('model', shell.task([
  'cd app && sequelize-auto -h qykj.com -d qykj -u root -x admin123 -p 3306 -e mysql && rm models/sessions.js',
]))

gulp.task('default', [
  'develop'
]);
