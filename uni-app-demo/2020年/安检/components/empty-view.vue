<template>
	<view class="empty-view-box">
		<image src="../../static/empty.png"></image>
		<text>暂时没有数据</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			name() {

			}
		},
	}
</script>

<style scoped="" lang="scss">
	.empty-view-box {
		z-index: 100;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		
		image{
			height: 262upx;
			width: 270upx;
			margin-bottom: 30px;
		}
		
		text {
			display: block;
			font-size: 15px;
			color: #8B8B8B;
			font-weight: bold;
			text-align: center;
		}
	}
</style>
