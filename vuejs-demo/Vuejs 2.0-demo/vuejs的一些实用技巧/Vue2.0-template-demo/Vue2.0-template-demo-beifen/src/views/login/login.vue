<template>
  <div id="app">
      <cHeader></cHeader>
      <div class="content">
      	  这里是登录页

      	  <div @click='dianji($event)' class="bb">代码块代码块代码块代码块代码块代码块代码块</div>

      	  <div class="aa"><label for="">1213</label><input type="text"></div>

      	  <button>按钮</button>

      	  <div class="cc">111111111111111111</div>
      	  <img src="~assets/images/aaa.png" />
      	   <div class="image"></div>

      	   <div class="aaa">{{xxx}}</div>
      </div>
  </div>	
</template>	

<script>

   import cHeader from '@c/header/header'
   import * as utils_types from '@u/index'
   
   export default {
        name: 'app',
        data() {
          return{
              xxx:'',
              items:[ '1', '2','3','4'],
              imgitems:[
                   {
                    url:require('assets/images/ccc1.png')
                   },
                   {
                    url:require('assets/images/ccc2.png')
                   },
                   {
                    url:require('assets/images/ccc3.png')
                   }
              ]
          }
        },
        components:{
          cHeader
        },
        methods:{
        	dianji(e){
              // touchElement(ElementName,className) 
              // 全局触摸 传递两个参数，一个是传递执行事件的带.的class类名
              // 另一个是 传递 触摸效果的  class样式名
              utils_types.touchElement('.bb','touchActive');
        	}
        },
        mounted(){
        }
    }
	 
</script>

<style lang='scss' scoped>
	#app{
       @include center;
	}
	.bb{
		width:100px;
		height:35px;
		@include text-overflow(2)
		@include opacity(0.6)
		@include border-radius(10px)
		@include posi-abs(0px, 0px, 0px, 0px)
		@include text-indent(2);
		@include posi-rel;

		@include border(all,red)
		@include margin(top,20px)
	}
	label,input{
		@include  inline-block(middle)
	}
	button{
		@include disabled
		@include prefix(transform, rotate(45deg), webkit ms);
		@include float(left,30px)
	}
	.cc{
		@include size
		@include padding(top,30px)

		@include background('~assets/images/ccc.png',right center,50px 50px)

		/*background-image:url('~assets/images/aaa.png');*/

	}
	
</style>