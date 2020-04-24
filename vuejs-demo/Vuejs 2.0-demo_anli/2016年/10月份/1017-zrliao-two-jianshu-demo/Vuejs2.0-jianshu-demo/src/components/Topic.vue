<template>
    <div class="display-transition">
         <ad>
              <div class="showbar"> 
                <div class="cover-image" :style="{'background-image':'url('+adbg+')'}"></div>
                <div class="text" style="text-shadow:1px 1px 1px #000000"> <h1>专题</h1> <h3>让思想汇聚，流传</h3> <p   style="font-size:14px;margin-bottom:5px">专题内容由多位写作者提供</p> <a href="#"><i class="fa fa-  pencil"></i>&nbsp;&nbsp;新建专题</a>
                </div>
             </div>
         </ad>
    	 <topic-details></topic-details>
    </div>
</template>


<script>
	import ad from './ad'
	import topicDetails from './topicDetails'

	export default {
		data() {
		  return {
            adbg:require('../assets/images/vue-demo-bg2.jpg')
 		  }
		},
		components:{
           ad,
           topicDetails
		}
	}
</script>

<style>
	
</style>  