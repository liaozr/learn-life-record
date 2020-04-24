define(function(require,exports,module){
        var b = require("b");
        console.log("a.js success");
        // console.log(module);
        exports.run=function(){
        	console.log("这个信息是来自函数run里面的")
        }
})