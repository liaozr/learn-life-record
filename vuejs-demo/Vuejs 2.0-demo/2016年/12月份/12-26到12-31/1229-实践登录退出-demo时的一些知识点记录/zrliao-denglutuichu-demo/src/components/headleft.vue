<template>
   <div class="headerleft">
   	    <div class='back' @click='back' v-if='$route.name !=="home" '>返回</div>
   	    <div class='back' @click='back_index' v-else>首页</div>
   </div>
</template>	
<script>
	export default{
		data(){
			return{

			}
		},
		methods:{
			back(){
				if ( this.$route.name == 'login'){
                   this.$router.push({path:'/'})
				}
				else{
				   history.go(-1)
				}
			},
			back_index(){
				this.$router.push({path:'/'})
			}
		}
	}
</script>
<style>
.headerleft{
		width:50px;
		display:inline-block;
		position:absolute;
		left:3px;
}
.headerleft .back{
	color:white;
	cursor:pointer;
	font-size:14px;
}
</style>

 