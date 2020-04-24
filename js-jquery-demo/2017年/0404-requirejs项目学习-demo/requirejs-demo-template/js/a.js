/*
*  a.js
*  创建一个名为“a”的模块
*/

// define('a', function(require, exports, module) {
//
//     exports.getTime = function() {
//         console.log(new Date())
//         return new Date();
//
//     }
//
// });

// 定义无依赖的模块,可以用上面的那种写法，也可以用下面的这种写法的。
define([],function () {
    // 使用return可以直接对外提供方法：
     return{
         backtoTop(){
          $('html,body').animate({
                  scrollTop: 0
          }, 500);
        },
        gongong(){
          console.log("this is msg is 公共的")
        }
    }
});

// 配置之后，那么我们在其他模块中，引入配置过的模块，就可以简单的这样写：
// var $ = require('jquery');
