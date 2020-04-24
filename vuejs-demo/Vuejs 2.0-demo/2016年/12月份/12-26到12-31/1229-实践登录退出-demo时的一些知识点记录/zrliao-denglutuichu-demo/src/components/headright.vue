<template>
   <div class="headerright">
   	     <div class="rightquit" v-show='$route.name !== "signout"'>
	   	     <div class='quit' v-if='$route.name == "home" '><router-link to='/signout'>退出</router-link></div>
	   	     <div class='quit' v-else> <router-link to='/home'>{{user.name}}</router-link></div>
   	     </div>
   </div>
</template>	
<script>
	import {mapGetters} from 'vuex'
	export default{
		data(){
			return{

			}
		},
		computed:{
			...mapGetters(['user'])
		}
	}
</script>

<style>
.headerright{
		 	
		width:50px;
		display:inline-block;
		position:absolute;
		right:3px;
}
.headerright .quit{
	color:white;
	cursor:pointer;
	font-size:14px;

}
.headerright .quit a{
	color:white;
}
</style>