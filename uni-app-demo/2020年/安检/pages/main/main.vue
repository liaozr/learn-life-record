<template>
	<view class="page">
		<view class="main-box">
			<home v-if="index === 0"></home>
			<mine v-else=""></mine>
		</view>
		<view class="tab-box">
			<view @tap="index=0">
				<image :src="index === 0 ? '../../static/home1.png' : '../../static/home2.png'"></image>
				<view :class="{green:index===0}">首页</view>
			</view>
			<view @tap="index=1">
				<image :src="index === 1 ? '../../static/mine2.png' : '../../static/mine1.png'"></image>
				<view :class="{green:index===1}">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import home from '@/pages/home/home'
	import mine from '@/pages/mine/mine'

	export default {
		components: {
			home,
			mine
		},
		data() {
			return {
				index: 0,
			};
		}
	}
</script>

<style lang="scss" scoped="">
	$imageSize:40upx;

	.page {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.main-box {
		flex: 1;
	}

	.tab-box {
		box-shadow: 0 4px 14px 0 rgba(166, 179, 194, 0.50);
		padding: 16upx 0;
		display: flex;

		>view {
			flex: 1;
			text-align: center;

			>view {
				margin-top: 10upx;
				font-size: 20upx;
				color: #9CA4BB;
			}
		}

		image {
			margin: 0 auto;
			display: block;
			height: $imageSize;
			width: $imageSize;
		}


	}
</style>
