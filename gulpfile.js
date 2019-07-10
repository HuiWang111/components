const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');  //处理管道崩溃问题
const notify = require('gulp-notify');  //报错与不中断当前任务
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const gutil = require('gulp-util');

function getSrc(filesName, fileType) {
  fileType = fileType ? fileType.trim() : 'js';

  if ( (filesName == null) || (filesName.trim && (filesName.trim() === '*')) ) {
    return 'dev/*.' + fileType;
  }

  const files = Array.isArray(filesName) ? filesName : filesName.split(',');

  return files.map((file) => {
    return 'dev/' + file.trim() + '.' + fileType;
  });
}

/**
 * @description  测试任务
 */
gulp.task('testJS', function () {
  return gulp.src('test/test.js')
  .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))
  .pipe(babel({
    presets: [
      [ "es2015", { "modules": false } ]
    ]
  }))
  .pipe(gulp.dest('dist'));
});

/**
 * @description 压缩dev下的js文件
 */
function compressJS (filesName) {
  const src = getSrc(filesName);

  gulp.task('compressJS',function(){
    return gulp.src(src)
    .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))
    .pipe(babel({
      presets: [
        [ "es2015", { "modules": false } ]
      ]
    }))
    .pipe(uglify({
      mangle: {
        reserved: ['Component', 'require' ,'exports' ,'module' ,'$', 'define', 'Observer']
      }
    }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
  });
}

compressJS();

/**
 * @description 输出es5未压缩版的js文件
 */
function getES5 (filesName) {
  const src = getSrc(filesName);

  gulp.task('getES5',function(){
    return gulp.src(src)
    .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))
    .pipe(babel({
      presets: [
        [ "es2015", { "modules": false } ]
      ]
    }))
    .pipe(rename({
      suffix: '.es5'
    }))
    .pipe(gulp.dest('dist'));
  });
}

getES5('util, components.base');

/**
 * @description less => css, 监听less变化自动更新css
 */
function toCSS (filesName) {
  const src = getSrc(filesName, 'less');

  gulp.task('less',function(){
    return (
      gulp.src(src)
      .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))
      .pipe(less())
      .pipe(autoprefixer({
        browsers: ['>0%']
      }))
      .pipe(gulp.dest('dev'))
    );
  });
  gulp.task('watchLess',function(){
    gulp.watch(src,['less']);
  });
  gulp.task('taskList', ['less', 'watchLess']);
  gulp.task('toCSS', function() {
    gulp.start('taskList');
  });
}
toCSS('components.base');

/**
 * @description 压缩dev下的css文件
 */
function compressCSS (filesName) {
  const src = getSrc(filesName, 'css');

  gulp.task('compressCSS',function(){
    return (
      gulp.src(src)
      .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))
      .pipe(cleanCSS())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('dist'))
    );
  });
}

compressCSS();