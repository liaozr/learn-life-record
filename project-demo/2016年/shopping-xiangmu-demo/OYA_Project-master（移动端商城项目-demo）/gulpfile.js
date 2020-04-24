//严格模式
'use strict';

//1）引入所有需要的包
var gulp = require('gulp');//本地安装为了在这里引入gulp
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var  jsmin = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();


// 2)编写任务

// 编译sass文件，生成压缩与未压缩的css文件
gulp.task('buildSass',function(){
	// 匹配文件
	return gulp.src('./app/sass/*.scss')

		// 未压缩文件
		.pipe(sass({outputStyle:'expanded'}))
		.pipe(gulp.dest('./app/css'))
		
		// 压缩文件
		.pipe(sass({outputStyle:'compressed'}))
		//改变压缩文件名字
//		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('./dist/css'))

		//浏览器同步的任务在css文件生成之后执行
		.pipe(browserSync.reload({stream:true}));
});

// 监听sass文件修改，并自动编译
gulp.task('jtSass',function(){
	gulp.watch('./app/sass/*.scss',['buildSass']);
});



// 浏览器同步任务
gulp.task('server',['jtSass'],function(){
	browserSync.init({
		server:{baseDir:'./app'},
		// 监听文件修改并自动刷新
		files:['./app/**/*.html','./app/css/*.css','./app/js/*.js','./app/json/*.json']
	});
});

// 压缩html
gulp.task('htmlmin',function(){
	gulp.src('./app/**/*.html')
	.pipe(htmlmin({
		removeComments:true,
		removeEmptyAttributes:true,
		minfyJS:true,
		minifyCSS:true
	}))
	.pipe(gulp.dest('./dist'));
});

// 压缩js
gulp.task('jsmin',function(){
	gulp.src('./app/js/*.js')
	//压缩
	.pipe(jsmin())
	//.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('./dist/js'));

});


gulp.task('imagemin',function(){
	gulp.src('./app/img/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/img'))
})