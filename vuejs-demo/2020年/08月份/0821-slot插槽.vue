<template>
	<div>
		<!-- slotdemo -->
		 <a :href="url">
			  <slot>默认模板内容</slot>
		 </a>
		 
		 
		 <!-- 父组件中 -->
		 <slotdemo :url="url">
			 {{website.title}}
			 <!-- 这里面的内容会代替子组件slotdemo里面的slot插槽里面的内容 -->
		 </slotdemo>
		
	</div>
</template>

<script> 
  export default{
	 props:{
		 url:''
	 },
	 data(){	 
		 return{
		 }
	 }
  }
</script>

<style>
</style>
