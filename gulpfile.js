var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  open = require('gulp-open'),
  livereload = require('gulp-livereload'),
  shell = require('gulp-shell');


gulp.task('develop', ['mount'], function () {
  livereload.listen();
  nodemon().on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('mkdir', shell.task([
  'test -d public/courseware || '+
  'mkdir public/courseware'
]));

gulp.task('mount', ['mkdir'], shell.task([
  'mountpoint public/courseware || '+
  'sshfs ubuntu@qykj.com:/home/ubuntu/courseware public/courseware'
]));

gulp.task('umount', shell.task([
  'sudo umount public/courseware'
]));

gulp.task('model', shell.task([
  'cd app && '+
  'sequelize-auto -h qykj.com -d qykj -u root -x admin123 -p 3306 -e mysql && '+
  'rm models/sessions.js'
]));

gulp.task('apidoc', shell.task([
  'rm -r ./doc ; '+
  'apidoc -i ./app  -o ./doc'
]));

gulp.task('api', ['apidoc'], function(){
  gulp.src('./doc/index.html')
  .pipe(open());
});

gulp.task('default', [
  'develop'
]);
