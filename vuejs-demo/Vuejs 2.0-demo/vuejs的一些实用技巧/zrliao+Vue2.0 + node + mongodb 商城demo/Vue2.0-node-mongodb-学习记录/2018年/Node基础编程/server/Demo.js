let user = require('./User') ; // nodejs 包里面 本身 含有 require 模块的
// 通过node来运行 ，是不会报错的。
console.log(2222222)
console.log(`userName:${user.userName}`)
console.log(`say:${user.sayHello()}`)
// ---------------------------------------------------------------
// 在控制台中输入 node Demo.js

// 会打印出下面这两行的
// 2222222
// userName:jack


// ---------------------------------------------------------------

// 创建 HttpServer 模块
let http = require('http')

let url = require('url');
let util = require('util');


let server = http.createServer((req,res) =>{
  res.statusCode = 200;
  res.setHeader("Content-Type","text/plain; charset=utf-8");

   // end响应结束

   //  util.inspect() 是用来调试的，可以将一个对象 转换成一个字符串
   // 相当于 JSON.stringify的功能。

   res.end( util.inspect(url.parse(req.url)) );

  //  res.end('Hello,Node.js!');

})

server.listen(3000,'127.0.0.1',() =>{

   console.log("服务器已经运行，请打开浏览,输入:http://127.0.0.1:3000/ 来进行访问.")
})

// ---------------------------------------------------------------
