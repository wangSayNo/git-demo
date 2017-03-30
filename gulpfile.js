 'use strict'
 
 /*
	1. LESS文件的 编译 压缩 合并
	2. JS文件的 合并 压缩 混淆
	3. img的复制
	4. html压缩
 */
 /* npm install 
		 gulp-less 
		 gulp-concat 
		 gulp-uglify 
		 gulp-cssnano 
		 gulp-htmlmin 
		 --save-dev
 */
 var gulp = require("gulp");
 var less = require("gulp-less"); 
 var cssnano = require("gulp-cssnano"); 
 var concat = require("gulp-concat");
 var uglify = require("gulp-uglify");
 var htmlmin = require("gulp-htmlmin");
 var browserSync = require("browser-sync");

 // 1. LESS文件的 编译 压缩 合并
 gulp.task('style',function(){
	// 这里在执行style任务时自动执行的
	gulp.src(["src/styles/*.less","!src/styles/_*.less"])
		.pipe(less()) /* 编译less文件*/
		.pipe(cssnano()) /* css文件压缩*/
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.reload({stream: true})); //刷新
 });

 // 2. JS文件的 合并 压缩 混淆
 gulp.task("script",function(){
 	gulp.src("src/scripts/*.js")
 		.pipe(concat('all.js'))  //合并js文件
 		.pipe(uglify()) //js代码混淆压缩
 		.pipe(gulp.dest("dist/scripts"))
 		.pipe(browserSync.reload({stream: true})); //刷新
 });

 // 3. img的复制
 gulp.task("image",function(){
 	gulp.src("src/images/*.*")
 		.pipe(gulp.dest("dist/images"))
 		.pipe(browserSync.reload({stream: true})); //刷新
 });

 // 4. html压缩
 gulp.task("html",function(){
 	gulp.src("src/*.html")
 		.pipe(htmlmin({collapseWhitespace: true,removeComments: true}))
 		.pipe(gulp.dest("dist"))
 		.pipe(browserSync.reload({stream: true})); //刷新
 });

 // 启动一个服务，顺便监视文件的变化
 gulp.task('serve',function(){
 	browserSync({server: {baseDir: ["dist"]}},function(err, bs){
 		console.log(bs.options.getIn(["urls","local"]));
 	});

 	// 监视文件的变化
 	gulp.watch("src/styles/*.less",["style"]);
 	gulp.watch("src/scripts/*.js",["script"]);
 	gulp.watch("src/images/*.*",["image"]);
 	gulp.watch("src/*.html",["html"]);
 });
