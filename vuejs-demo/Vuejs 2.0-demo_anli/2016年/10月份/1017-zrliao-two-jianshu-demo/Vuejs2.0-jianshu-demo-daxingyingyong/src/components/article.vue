<template>
	<ul>
	  <li  v-for="list in getlists" class="list">
	    <p class="list-top">
	    	<a href="#" class="author"><span v-text='list.name'></span></a>
	    	<span class="time"> - {{ list.time}}</span>
	    </p>
	    <h2 class="title"><a href="#" v-text='list.title'></a></h2>
	    <span class="small-text">阅读 {{list.readnum}} -</span>
	    <span class="small-text">评论 {{list.pinglun}}-</span>
	    <span class="small-text">喜欢 {{list.like}} -</span>
	    <span class="small-text">打赏 {{list.dashang}} </span> 
	    <span class="image" :style="{'background-image':'url('+list.imgbg+')','background-size': '100%','background-repeat': 'no-repeat'}">
	    </span>      
	  </li>
	</ul>
</template>


<script>  
    import { mapGetters} from 'vuex'
	export default{
		data(){
			return{
				
			}
		},
		computed:{
			...mapGetters(['getlists'])
		}
	}
</script>	


<style></style>

