const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');  //处理管道崩溃问题
const notify = require('gulp-notify');  //报错与不中断当前任务
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

/**
 * @description 压缩dev下的js文件
 */
gulp.task('compressJS',function(){

  return gulp.src('dev/*.js')
  .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('dist'));

});

/**
 * @description 输出es5未压缩版的js文件
 */
gulp.task('outputES5',function(){

  return gulp.src(['dev/util.js', 'dev/components.base.js'])
  .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(rename({
    suffix: '.es5'
  }))
  .pipe(gulp.dest('dist'));

});

/**
 * @description  测试任务
 */
gulp.task('testJS', function () {
  return gulp.src('test/test.js')
  .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('dist'));
});

/**
 * @description less => css, 监听less变化自动更新css
 */
gulp.task('less',function(){
  return (
    gulp.src('dev/*.less')
    .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0']
    }))
    .pipe(gulp.dest('dev'))
  );
});
gulp.task('watchLess',function(){
  gulp.watch(['dev/*.less'],['less']);
});
gulp.task('taskList', ['less', 'watchLess']);
gulp.task('toCSS', function() {
  gulp.start('taskList');
});

/**
 * @description 压缩dev下的css文件
 */
gulp.task('compressCSS',function(){
  return (
    gulp.src('dev/*.css')
    .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'))
  );
});