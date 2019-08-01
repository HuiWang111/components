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
const concat = require('gulp-concat');

function getSrc(filesName, fileType, path) {
  fileType = fileType ? fileType.trim() : 'js';
  path = path ? path : '';

  if ( (filesName == null) || (filesName.trim && (filesName.trim() === '*')) ) {
    return 'dev/*.' + fileType;
  }

  const files = Array.isArray(filesName) ? filesName : filesName.split(',');

  return files.map((file) => {
    return 'dev/' + path + file.trim() + '.' + fileType;
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
 * @description 压缩下的js文件
 */
const utilJSFile = getSrc(
  'util'
);
const cptsJSFile = getSrc(
  'components',
  'js',
  'components/ygf/'
);
gulp.task('js-min',function() {
  return gulp.src(utilJSFile.concat(cptsJSFile))
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

/**
 * @description 输出es5未压缩的js文件
 */
gulp.task('toES5',function(){
  return gulp.src(utilJSFile.concat(cptsJSFile))
  .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))
  .pipe(babel({
    presets: [
      [ "es2015", { "modules": false } ]
    ]
  }))
  .pipe(gulp.dest('dist/ygf'));
});

/**
 * @description less => css, 监听less变化自动更新css
 */
function toCSS (filesName, path) {
  const src = getSrc(filesName, 'less', path);console.log(src);

  gulp.task('less',function() {
    return (
      gulp.src(src)
      .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))
      .pipe(less())
      .pipe(autoprefixer({
        browsers: ['>0%']
      }))
      .pipe(gulp.dest('dist/ygf'))
    );
  });
  gulp.task('watchLess',function(){
    gulp.watch('dev/components/less/Menu.less',['less']);
    gulp.watch('dev/' + path + 'less/CardList.less', ['less']);
  });
  gulp.task('taskList', ['less', 'watchLess']);
  gulp.task('toCSS', function() {
    gulp.start('taskList');
  });
}
toCSS('components', 'components/');

/**
 * @description 压缩css文件
 */
function compressCSS (filesName, path) {
  const src = getSrc(filesName, 'css', path);

  gulp.task('css-min',function() {
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

compressCSS('components', 'components/');

/* 合并js文件 */
const cptsBaseFiles = getSrc(
  // 'Icon, Alert, Button, Gallery, Message, Modal, Pagination, Tabs',
  'Icon, Button, Gallery, Message, Pagination, Tabs',
  'js',
  'components/js/'
);
const cptsBaseCommonFile = getSrc(
  'color, svg, className',
  'js',
  'components/js/common/'
);
gulp.task('combineCptsBase', function () {
  return gulp.src(cptsBaseCommonFile.concat(cptsBaseFiles))
  .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))
  .pipe(concat('components.js'))
  .pipe(gulp.dest('dev/components/ygf'))
});