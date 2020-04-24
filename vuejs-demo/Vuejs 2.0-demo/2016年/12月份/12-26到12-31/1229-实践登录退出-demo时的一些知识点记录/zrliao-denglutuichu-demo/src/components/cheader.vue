<template>
   <div class="header">
   	    <headleft v-show='$route.name !==undefined '></headleft>
   	    <headcenter></headcenter>
   	    <headright v-show='user.id'></headright>
   </div>
</template>	
<script>

    import { mapGetters } from 'vuex'

	import headleft from './headleft'
	import headcenter from './headcenter'
	import headright from './headright'
	export default{
		data(){
			return{

			}
		},
		components:{
			headleft,
			headcenter,
			headright
		},
		computed:{
			...mapGetters(['user'])
		}
	}
</script>

<style>
	.header{
	    position: relative;
	    line-height: 38px;
	    color: #fff;
	    text-align: center;
	    background: #222;
	    font-size:0;
	}
</style>