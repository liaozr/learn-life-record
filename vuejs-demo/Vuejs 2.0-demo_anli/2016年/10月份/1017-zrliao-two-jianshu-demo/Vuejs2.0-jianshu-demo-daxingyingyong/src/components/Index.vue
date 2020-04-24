<template>
    <div class="display-transition">
         <ad>
              <div class="showbar"> 
                <div class="cover-image" :style="{'background-image':'url('+adbg+')'}"></div>
                <div class="text" style="text-shadow:1px 1px 1px #000000"> <h1>简书</h1> 
                    <h3>交流故事，沟通想法</h3> 
                    <p>一个基于内容分享的社区</p>
                     <a href="#"><i class="fa fa-home"></i>提笔写篇文章</a>
                </div> 
              </div>           
         </ad>
    	 <article-details></article-details>
    </div>
</template>


<script>
	import ad from './ad'
	import articleDetails from './articleDetails'
	export default {
		data() {
		  return {
            adbg:require('../assets/images/vue-demo-bg3.jpg')
 		  }
		},
		components:{
           ad,
           articleDetails
		}
	}
</script>

<style>
	
</style> 