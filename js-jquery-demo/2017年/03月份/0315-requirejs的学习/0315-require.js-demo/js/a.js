/*

*  a.js

*  创建一个名为“a”的模块

*/

define('a', function(require, exports, module) {

    exports.getTime = function() {
        console.log(new Date())
        return new Date();

    }

});
