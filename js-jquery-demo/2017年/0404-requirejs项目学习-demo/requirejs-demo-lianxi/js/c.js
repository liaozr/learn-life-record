// 假若这个依赖不需要其他依赖的写法 ，只是涉及到  b.js 这个 自身依赖 的写法

define([], function () {
    return{
        test: function(){
           return 'this value come from c.js'
        },
        // 因为是对象结构 ,所以这里只能用逗号形式的，这里用分号是会报错的。
        cuowu: function(){
           return 'this is error'
        }
    }
});
