 <template>
 	<view class="page">
 		<image class="logo-img" src="../../static/images/logo.png"></image>
 		<view class="input-box divider3">
 			<image style="width: 10px;height: 15px;" src="../../static/images/icon_phone.png"></image>
 			<input v-model.trim="username" placeholder="请输入用户名" placeholder-style="font-size:16px;color:color: #CACACA;" />
 		</view>
 		<view class="input-box divider3" style="padding-top: 29px;">
 			<image style="width: 12px;height:17px;" src="../../static/images/icon_lock.png"></image>
 			<input v-model.trim="password" :password="isPassword" placeholder="请输入密码" placeholder-style="font-size:16px;color:color: #CACACA;" />
 			<image @click="isPassword=!isPassword" style="width: 20px;height:12px;" src="../../static/images/icon_eye.png"></image>
 		</view>
 
 		<button :loading="loading" @click="login" class="btn" hover-class="app-btn-active">登录</button>
 	</view>
 </template>
 
 <script>
 	var view;
 	export default {
 		data() {
 			return {
 				isPassword: 'true',
 				username: '0000',
 				password: 'posun@2019',
 				loading: false,
 			};
 		},
 		created() {
 			view = this;
 		},
 		methods: {
 			login() {
 				if (!this.username) {
 					this.toast('请输入用户名')
 				} else if (!this.password) {
 					this.toast('请输入密码')
 				} else {
 					this.loading = true;
 					uni.setStorageSync('empid', this.username);
 					this.$request({
 						url: 'WXLOGIN',
 						method: 'POST',
						showLoading:true,
						loadingText:'正在提交',
 						data: {
 							openId: uni.getStorageSync('openid'),
 							empId: this.username,
 							password: this.password
 						},
 						success: (data) => {
							console.log(111)
							console.log(data)
 							getMenu();
 						},
 						complete() {
 							view.loading = false;
 						}
 					});
 				}
 			},
 		}
 	}
 	function getMenu() {
 		view.$request({
 			url: 'GETMENU',
 			showLoading: true,
 			loadingText: '正在获取菜单...',
 			data: {
 				empId: view.username,
 			},
 			success: (menu) => {				
				console.log(111)
				console.log(menu)
 				if (menu.length > 0) {
 					uni.navigateTo({
 						url: '../main/main'
 					})
 				} else {
 					uni.navigateTo({
 						url: '../main/main'
 					})
					//  					uni.showToast({
					//  						title: '系统未分配菜单，请联系管理员',
					//  						icon: 'none'
					//  					})
 				}
 			},
 		})
 	}
 </script>
 
 <style   scoped="">
 	.page {
 		padding-top: 96upx;
 	}
 
 	.logo-img {
 		height: 200upx;
 		width: 200upx;
 		display: block;
 		margin: 0 auto;
 	}
 
 	.input-box {
 		display: flex;
 		width: 70%;
 		align-items: center;
 		margin: 0 auto;
 		padding: 110upx 5upx 10upx 20upx;
 
 		
 	}
		.input-box >input {
 			flex: 1;
 			padding-left: 20upx;
 			font-size: 16px
 		}
 
 	.btn {
 		width: 70%;
 		height: 76upx;
 		margin: 106upx auto 0 auto;
 		background-image: linear-gradient(-43deg, #02B360 0%, #A2DE65 100%);
 		border-radius: 38px;
 		font-size: 16px;
 		color: white;
 
 	}
 </style>
 