define(function(require,exports,module){
        console.log("a.js是入口脚本文件，但是a.js里面是最先执行完b.js这个脚本文件的,所以这段文字是最先被打印出来的")
        console.log("b.js success");
        // console.log(module);
        var c = require.async("c");
        // 这样只有在用到这个模块时，对应的js文件才会被下载，
        // 也就实现了JavaScript代码的按需加载。
})