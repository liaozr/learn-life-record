<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
			uni.setStorageSync('openid', 'oo7br4pZO908VcxepySvytDn9mak');
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/app.scss";
	@import "./common/icon.css";
	@import "./common/css/public.css";
</style>
