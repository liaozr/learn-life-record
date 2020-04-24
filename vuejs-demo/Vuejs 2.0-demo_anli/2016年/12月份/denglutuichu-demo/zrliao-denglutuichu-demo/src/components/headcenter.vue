<template>
   <div class="headercenter">
   	     <div class="center" v-show='$route.name=="login"'>登录</div>
   	     <div class="center" v-show='$route.name !=="home" && $route.name !=="signout" && $route.name !=="login"'>首页</div>
   	     <div class="center quit" v-show='$route.name=="signout"'>退出</div>
   </div>
</template>	
<script>
	 
	export default{
		data(){
			return{

			}
		}
	}
</script>

<style>
	 .headercenter{
	 	display:inline-block;
	 }
	  .headercenter .center{
	  	font-size:14px;
	  }
</style>