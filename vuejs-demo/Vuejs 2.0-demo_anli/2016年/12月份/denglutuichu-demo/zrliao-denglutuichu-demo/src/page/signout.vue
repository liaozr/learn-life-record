<template>
	<div>
	    <div class="btn">
			<button @click="submit">确认退出</button>
		</div>
	</div>
</template>

<style  scoped>
	.btn {
		padding: 50px;
		text-align: center;	 
	}
	.btn button{
		padding: 5px 10px;
	}
</style>

<script>
    
    export default {
    	data(){
    		return{

    		}
    	},
    	methods:{
    		submit(){
    			this.$store.dispatch("quit_clear")
    			this.$router.push({path:'/login'})
    		}
    	}
         
    }
</script>