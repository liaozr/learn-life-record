<template>
	<div class="g-index">
	
		<div class="msg" v-if="user.id">
			<img width="50" :src="logo" alt=""> <br>
			   哈哈，恭喜你已经入坑Vue2
		</div>
		<div class="weidenglu" v-else>
		   <router-link to='/login'>你还未登录，请先登录</router-link>
        </div>

	</div>
</template>	

<script>
    import { mapGetters } from 'vuex'
	export default{
		data(){
			return{
				logo:require('./../assets/logo.png')
			}
		},
		computed:{
			...mapGetters(['user'])
		}
	}
</script>

<style>
	.g-index{
	padding: 50px;
    text-align: center;
	}

	.login-msg {
		padding: 50px;
		text-align: center;
	}
	.msg {
		padding: 50px;
		text-align: center;
		font-size: 20px;
		color: red;
	}
</style>
