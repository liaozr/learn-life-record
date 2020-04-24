/* main.js */

// 对常用的模块进行映射配置，这样在引入时就可以少写一些代码。

// 配置之后，那么我们在其他模块中，引入配置过的模块，就可以简单的这样写：
// var $ = require('jquery');

// 如果不进行配置，也可以这样引入模块：
// require('./components/button');

requirejs.config({
    paths: {
        'jquery': 'jquery.min',
        'swiper': 'swiper-3.3.1.min',
        'vue': 'vue.min',
        'a': 'a',
        'b': 'b',
        'c':'c'
    }
});
requirejs(['jquery', 'swiper', 'vue', 'a', 'b'], function($, Swiper, Vue, a, b) {
    $(function() {

        // swiper模块
        var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: 3000,
            // 如果需要分页器
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 0,
            centeredSlides: true,
            autoplayDisableOnInteraction: false
        })

        //回到顶部
        $('#backtop').on("click", a.backtoTop);

        // 默认出现的公共模块部分
        b.b_public();  

        // 点击 b事件
        $('.bb').on('click',b.shijian)

        //  vue模块，只能出现一个vue模块
        new Vue({
          el:'body',
          data:{
            aa:'this is aa message',
            bb:'this is bb message'
          }
        })
    })
});
