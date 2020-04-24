<template>

<!-- 这个是用props的方式 -->

<!-- 
    <div class="showbar"> 
		<div class="cover-image" :style="{'background-image':'url('+imgbg+')',color:activecolor}"></div> 
		<div class="text" style="text-shadow:1px 1px 1px #000000"> 
			<h1>{{title}}</h1> <h3>{{dec }}</h3>
			<div>{{ yongtu}}</div>
			<a href="#"><i class="fa fa-home"></i>{{btntext}}</a> 
		 </div> 
	</div>
 -->

<!-- 这个是用slot分发内容的方式 -->
<slot></slot>	
</template>

<script>
	export default{
		data(){
			return{
                 activecolor:'red',
                 imgbgg:''
 			}
		},
		props:['title','dec','yongtu','btntext','imgbg'],
		computed:{
			imgbgg() {
				return this.imgbg
			}
		}
	}

</script>


<style>
	

</style>