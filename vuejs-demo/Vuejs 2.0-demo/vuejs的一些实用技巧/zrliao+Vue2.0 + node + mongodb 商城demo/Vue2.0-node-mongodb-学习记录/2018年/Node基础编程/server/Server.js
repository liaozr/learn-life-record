// ---------------------------------------------------------------
// 创建 HttpServer 模块
let http = require('http')
let url = require('url');
let util = require('util');

// web容器，如何通过 node 来加载静态资源
// fs 是node 的文件系统

let fs= require ('fs');

let server = http.createServer((req,res) =>{

// ----------------------------------------------------------------
  // fs 读取一个文件

  var pathname = url.parse(req.url).pathname;

  fs.readFile(pathname.substring(1),function(err,data){
    if(err){
      res.writeHead(404,{
        'Content-Type':'text/html'
      })
    }else{
      res.writeHead(200,{
        'Content-Type':'text/html'
      })

      // write 是最终 要写入的 数据。
      // 把data  变成字符串 写进去
      res.write(data.toString())
    }

    // end 还是要在 文件系统里面的
    // end 就是 响应结束
    // res.end(); 是要放到读取 文件的内部的。

    res.end();

  })
})

server.listen(3000,'127.0.0.1',() =>{

   console.log("服务器已经运行，请打开浏览,输入:http://127.0.0.1:3000/ 来进行访问.")

})

// ---------------------------------------------------------------
