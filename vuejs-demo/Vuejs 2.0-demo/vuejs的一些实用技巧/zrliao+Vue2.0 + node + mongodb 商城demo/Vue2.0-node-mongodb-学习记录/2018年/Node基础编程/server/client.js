let http = require('http')

let util = require('util')

http.get("http://www.imooc.com/u/card", function (res) {

    let data = '';

    // res.on  监听我们数据的变化。
    // 不断的对数据进行累加。
    res.on('data', function (chunk) {
        data += chunk;
    });

    // 数据接收完
    res.on('end', function () {

        let result = JSON.parse(data);

        //  util.inspect() 是用来调试的，可以将一个对象 转换成一个字符串
        // 相当于 JSON.stringify的功能。

        console.log("result:"+util.inspect(result))
        
    })
});
