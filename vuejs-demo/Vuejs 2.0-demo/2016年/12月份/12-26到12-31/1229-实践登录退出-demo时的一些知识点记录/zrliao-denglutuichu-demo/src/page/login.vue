<template>
	<div>

        <form class="login" v-on:submit.prevent="submit">

			<div class="line">	
				<div v-show="btn && !form.id">id不能为空</div>
				<input type="number" placeholder="输入你的id" v-model="form.id">
			</div>
			<div class="line">
				<div v-show="btn && !form.name">用户名不能为空</div>
				<input type="text" placeholder="输入你的用户名" v-model="form.name">
			</div>
			<button>登录</button>

		</form>

	</div>
</template>

<script>

    export default {
        data() {
			return {
				btn: false, //true 已经提交过， false没有提交过
				form: {
					id: '',
					name: ''
				}
			}
		},
		methods: {
			submit() {
				this.btn = true
				if(!this.form.id || !this.form.name) return

				// this.USER_SIGNIN(this.form)
			    this.$store.dispatch("user_signin",this.form)

				this.$router.replace({ path: '/home' })
			}
		},
		activated(){
			this.btn = false
			this.form.id=''
			this.form.name=''
		}
    }
</script>

<style scoped>

.login {
		padding: 50px;
		text-align: center;
}
.login .line {
	   padding: 5px;		 
}
.login .line input{
	padding: 0 10px;
	 line-height: 28px;
}
.login button{
	padding: 0 20px;
	margin-top: 20px;
	line-height: 28px;
}
</style>

