var gulp=require('gulp'),
    sass=require('gulp-sass');
// scss 任务
gulp.task('sass',function(){
  return gulp.src('public/sass/*.scss') //获取该任务需要的文件
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))                 //该任务调用的模块
      .pipe( gulp.dest('public/css'));   //将在 public/css 文件夹中生产public.css
});

// 默认任务
gulp.task('default',['sass','watchSass']);

//监听文件
gulp.task('watchSass',function(){
    return gulp.watch('public/sass/*.scss',['sass']);
    //监听 public/sass/public.scss 文件，修改时自动执行 sass 任务。
});
