const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('webpack:user', shell.task(['webpack --config ./react-app/user/webpack.config.js --debug']));
gulp.task('webpack:admin', shell.task(['webpack --config ./react-app/admin/webpack.config.js --debug']));

gulp.task('watch:user', function(){
  gulp.watch('./react-app/user/**/*.js', ['webpack:user']);
});

gulp.task('user', ['webpack:user', 'watch:user']);

gulp.task('watch:admin', function(){
  gulp.watch('./react-app/admin/**/*.js', ['webpack:admin']);
});

gulp.task('watch', function(){
  gulp.watch('./react-app/**/*.js', ['webpack:user','webpack:admin']);
});
