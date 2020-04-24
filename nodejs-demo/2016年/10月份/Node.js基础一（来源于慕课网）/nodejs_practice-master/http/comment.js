var http = require('http');
//序列化
var querystring = require('querystring');
//测试数据
var postData = querystring.stringify({
	'content':'忍不住想测试一下...',
	'mid':8837
})

var options = {
	port:80,
	hostname:'www.imooc.com',
	path:'/course/docomment',
	method:'POST',
	headers:{
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=5b61fb21-dcbd-4e76-b570-8fcea172e3b3; imooc_isnew_ct=1466647961; CNZZDATA1260017887=1577738179-1469859863-https%253A%252F%252Fwww.baidu.com%252F%7C1470015002; last_login_username=ai804671397%40qq.com; PHPSESSID=kbc5ntnrr2v4435c6oio7l30e1; jwplayer.qualityLabel=è¶æ¸; loginstate=1; apsid=E2Yzg0ZDllNmY3MTkyMWJkOTBmYWQ3YjdlNjE0YTIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzkzNzQyNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBkNGU0YTY3NjUzNTUxYzdkMzY4MzdjMTIyMjViNjY5INbMVyDWzFc%3DZW; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1472901149,1472952894,1472969746,1473037083; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1473042127; imooc_isnew=2; cvde=57ccc3713e3c3-37',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Referer':'http://www.imooc.com/video/8837',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}

var req = http.request(options,function(res){
	console.log('status:'+res.statusCode);
	console.log('headers:'+JSON.stringify(res.headers));

	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	})

	res.on('end',function(){
		console.log('评论完毕！');
	})

	res.on('error',function(e){
		console.log('Error:'+e.message);
	})
})

req.write(postData);
req.end();