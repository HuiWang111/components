const gulp = require('gulp');
const plumber = require('gulp-plumber');  //处理管道崩溃问题
const notify = require('gulp-notify');  //报错与不中断当前任务
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

gulp.task('compressJS',function(){

  return gulp.src('dev/*.js')
  .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(uglify({
    mangle: false
  }))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('dist'));

});
