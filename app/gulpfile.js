var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function(){
  return gulp.src('./test/test.js')
    .pipe(mocha());
});

gulp.task('watch:test', function(){
  gulp.start('test');
  gulp.watch(['./controllers/**/*.js','./models/**/*.js','./test/**/*.js','./routes/**/*.js','./*.js'], ['test']);
});

gulp.task('default', ['watch:test']);
