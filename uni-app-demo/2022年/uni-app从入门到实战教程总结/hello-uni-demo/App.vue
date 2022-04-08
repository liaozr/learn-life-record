<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onError:function(err){
			console.log('出现异常了',err)
		}
	}
</script>

<style>
	/* App.vue里面定义的样式是属于全局样式来的，是所有组件都生效的 */
	/*每个页面公共css */
	@import url("./static/fonts/iconfont.css");
	.box1{
		background: pink;
	}
</style>
