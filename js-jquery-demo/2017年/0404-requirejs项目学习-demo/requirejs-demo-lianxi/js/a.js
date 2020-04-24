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
define([], function () {
    return{
        getTime: function(){
          console.log(new Date())
          return new Date();
        }
    }
});
