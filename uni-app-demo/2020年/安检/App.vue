<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 			uni.login({
			// 				provider: 'weixin',
			// 				success: function(loginRes) {
			// 					console.log(loginRes);
			// 				}
			// 			});

			// 			uni.request({
			// 				url: 'http://192.168.1.129:8080/eidpws/wxTrace/wxLogin/getSessionKeyOropenid', //仅为示例，并非真实接口地址。
			// 				data: {
			// 					code: '0337CPTJ0DyVJ72M3sRJ0TbHTJ07CPTF',
			// 				},
			// 				method: 'POST',
			// 				success: (res) => {
			// 					console.log(JSON.stringify(res));
			// 					
			// 				}
			// 			});
			uni.setStorageSync('openid', 'oo7br4pZO908VcxepySvytDn9mak');
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/css/app.scss";
	@import "./common/css/icon.css";
</style>
