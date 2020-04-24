<template>
	<div>
		<div style="padding: 50px;">{{user.name}}欢迎回家</div>
	</div>
</template>


<script>
    import { mapGetters } from 'vuex'
    export default {
    	data(){
    		return{

    		}
    	},
    	computed:{
    		...mapGetters(['user'])
    	}
        
    }
</script>