<template>
	<view>
		<view class="head-box">
			<image class="head-img" src="../../static/head_img.png"></image>
			<text>龙华第一燃气站</text>
		</view>

		<view class="num-box divider3">
			<view>
				<text>1180</text>
				<text>已上报居民用户</text>
			</view>
			<view>
				<text>1180</text>
				<text>已上报工商用户</text>
			</view>
			<view>
				<text>1180</text>
				<text>站点用户</text>
			</view>
		</view>

		<navigator url="../an_jian_lie_biao/index?customerType=10">
			<view class="app-item divider3" hover-class="app-item-active">
				<image src="../../static/icon_juming.png"></image>
				<text class="app-left-text2">居民用户安检核查</text>
			</view>
		</navigator>
		<navigator url="../an_jian_lie_biao/index?customerType=20">
			<view class="app-item divider3" hover-class="app-item-active">
				<image src="../../static/icon_gongshang.png"></image>
				<text class="app-left-text2">大型工商用户安检核查</text>
			</view>
		</navigator>
		<navigator url="../qi_ye_zhi_shi_ku/index">
			<view class="app-item divider3" hover-class="app-item-active">
				<image src="../../static/icon_zhishiku.png"></image>
				<text class="app-left-text2">企业知识库</text>
			</view>
		</navigator>
		<navigator url="../tong_zhi_gong_gao/index">
			<view class="app-item divider3" hover-class="app-item-active">
				<image src="../../static/icon_tongzhi.png"></image>
				<text class="app-left-text2">通知公告</text>
			</view>
		</navigator>
		<navigator url="../xiu_gai_mi_ma/index">
			<view class="app-item divider3" hover-class="app-item-active">
				<image src="../../static/icon_xxmm.png"></image>
				<text class="app-left-text2">修改密码</text>
			</view>
		</navigator>
	</view>
</template>

<script>
	let view;

	export default {
		data() {
			return {

			};
		},
		onLoad() {
			this.$request({
				url: 'findSafetyQtyAndCustomerQty',
				data: {
					"siteId": "",
					"empId": ""
				},
				success(res) {

				}
			})
		}
	}
</script>

<style lang="scss" scoped="">
	.head-box {
		padding: 30upx 48upx;

		>text {
			font-weight: bold;
			font-size: 44upx;
			color: #000000;
		}
	}

	.head-img {
		margin-right: 30upx;
		vertical-align: middle;
		height: 160upx;
		width: 160upx;
	}

	.num-box {
		display: flex;
		padding-bottom: 30upx;
		justify-content: space-around;

		text {
			display: block;
			text-align: center;
		}

		text:nth-child(1) {
			margin-top: 40upx;
			font-size: 32upx;
			color: #02B360;
			font-weight: bold;
		}

		text:nth-child(2) {
			margin-top: 12upx;
			font-size: 28upx;
			color: #8B8B8B;
		}
	}

	.app-item {

		>image {
			margin-right: 20upx;
			height: 40upx;
			width: 36upx;
		}

		>text {
			font-size: 30upx;
			color: #000000;
		}
	}
</style>
