<template>
    <div id="wrapper">
	    <nav class="navbar navbar-default">
	      <div class="container">
	        <a class="navbar-brand" href="#">
	          <i class="glyphicon glyphicon-time"></i>
	          计划板
	        </a>
	        <ul class="nav navbar-nav">
	          <li><a v-link="'/home'">首页</a></li>
	          <li><a v-link="'/time-entries'">计划列表</a></li>
	        </ul>
	      </div>
	    </nav>

	    <div class="container">
	      <div class="col-sm-3">
	        <sidebar :time="totalTime"></sidebar>
	      </div>
	      <div class="col-sm-9">
	        <router-view></router-view>
	      </div>
	    </div>
    </div>
    111111
    


        <div class="banner swiper-container">

          <div class="swiper-wrapper">

              <div class="swiper-slide" v-for='img_src in images'>
                    <img :src="img_src.img"  alt="">
              </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
      </div>

    <display></display>
    <increment-button></increment-button>   
</template>


<style>
	@import './assets/index.css';
  @import './assets/swiper-3.3.1.min.css';
</style>


<script type="text/javascript">
import  sidebar from './components/Sidebar'


import  display from './components/Display'
import  incrementButton from './components/IncrementButton'

// import 我们刚刚创建的 store

// 我们需要修改根组件来让应用注意到 store 的存在位置。

// 修改 App.vue，注入 store。

import store from './vuex/store' 

 

require('./assets/flexible.js');
require('./assets/index.js');
require('./assets/swiper-3.3.1.min.js');

require('./assets/jquery.cookie.js');

require('./assets/jquery.validation.min.js');
// var Swiper=require('swiper');

// import $ from 'jquery'


// import Swiper from 'swiper'

//     var mySwiper = new Swiper ('.swiper-container', {
//         loop: true,
//         autoplay: 3000,
   
//         pagination: '.swiper-pagination',
//         paginationClickable: true,
//         spaceBetween: 30,
//         centeredSlides: true,
//         autoplayDisableOnInteraction: false
// })        



	$(function(){

		$("body").css({
             "height":"2000px"
		})
		console.log("hello");
		$("body").css({
			fontSize:'20px'
		})
    var fonts=$('html').attr("data-dpr");
    var Cookies=$.cookie('Cookies',fonts,{expires:9999999999});
    console.log(Cookies);
 	})



  export default{
  	data () {
  		return{
             totalTime: 1,
             images:[
                 {  //这里的require是不用加上引号的
                 	img:require('./assets/images/aa.jpg')
                 },
                 {
                 	img:require('./assets/images/bb.jpg')
                 },
                 {
                 	img:require('./assets/images/cc.jpg')
                 },

             ]
             
  		}
  	},
  	components:{
  		sidebar,
      display,
      incrementButton
  	},

    // 在根组件加入 store，让它的子组件和 store 连接
    store,
    
  	ready() {
        this.$http.get('http://localhost:8080/time')
          .then(function(ret) {
            this.totalTime = ret.data.time;
          })
          .then(function(err) {
            console.log(err);
          })
    },
  	events: {
      timeUpdate (timeEntry) {
        console.log(timeEntry);
        this.totalTime += parseFloat(timeEntry.totalTime)
      },
      deleteTime (timeEntry) {
        this.totalTime -= parseFloat(timeEntry.totalTime)
      }
    }
  }	
</script>

 
	
 

