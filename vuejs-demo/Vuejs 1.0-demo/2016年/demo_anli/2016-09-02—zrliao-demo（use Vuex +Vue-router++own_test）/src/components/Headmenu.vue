<template>
   <div class="head"  v-text='headvalue'>
   </div>
</template>

<script>
    export default{
    	props:['headvalue']
    }
</script>

<style>
	.head{
		background-color: #009CD5;width:100%;height:50px;text-align: center;color:white;line-height: 50px;
	}
</style>
