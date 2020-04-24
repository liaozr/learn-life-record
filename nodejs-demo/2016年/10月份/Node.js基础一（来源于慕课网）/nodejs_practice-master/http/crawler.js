var http = require('http');
var cheerio = require('cheerio')
var url = "http://www.imooc.com/learn/348";

function filterChapters(html) {
	var $ = cheerio.load(html);
	var chapters = $('.mod-chapters');

	/*[{
		chapterTitle:'',
		videos:[
			title:'',
			id:''
		]
	}]*/

	var courseData = [];
	var chapter = '';
	var chapterTitle='';
	var videos = '';
	var chapterData = '';
	var video = '';
	var videoTitle = '';
	var id = '';
	chapters.each(function(index, el) {
		chapter = $(this);
		chapterTitle = chapter.find('strong').text();
		videos = chapter.find('.video').children('li');
		chapterData = {
			chapterTitle:chapterTitle,
			videos:[]
		}

		videos.each(function(index, el) {
			video = $(this).find('.J-media-item');
			videoTitle = video.text();
			id = video.attr('href').split('video/')[1];

			chapterData.videos.push({
				title:videoTitle,
				id:id
			})
		});

		courseData.push(chapterData);
	});
	return courseData;
}

function printCourseInfo(courseData){
	var context = '';
	var chapterTitle = '';
	courseData.forEach(function(item){
		chapterTitle = item.chapterTitle;
		// console.log(chapterTitle+'\n');
		context += chapterTitle + '\n';
		item.videos.forEach(function(video){
			// console.log('[' + video.id + ']' +video.title+'\n');
			context += '['+video.id+']'+video.title+'\n';
		})
	})
	console.log(context);
}

http.get(url,function(res){
	var html = "";
	res.on('data',function(data){
		html += data;
	})
	res.on('end',function(){
		var courseData = filterChapters(html);

		printCourseInfo(courseData);
	})
}).on('error',function(){
	console.log('获取课程数据出错！');
})