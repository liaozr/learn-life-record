<template>
	<view class="page">
		<navigator url="../ju_ming_an_jian_deng_ji/index?customerType=10">
			<view class="item item1" hover-class="app-btn-active">
				<text>居民用户安检</text>
				<text>对站点进行巡查上报</text>
			</view>
		</navigator>
		<navigator url="../ju_ming_an_jian_deng_ji/index?customerType=20">
			<view class="item item2" hover-class="app-btn-active">
				<text>工商用户安检</text>
				<text>整改反馈后的站点核查</text>
			</view>
		</navigator>
		<navigator url="../qi_ye_zhi_shi_ku/index">
			<view class="item item3" hover-class="app-btn-active">
				<text>企业知识库</text>
				<text>对重要任务检查并上报</text>
			</view>
		</navigator>
		<navigator url="../tong_zhi_gong_gao/index">
			<view class="item item4" hover-class="app-btn-active">
				<text>通知公告</text>
				<text>查看企业的通知公告</text>
			</view>
		</navigator>
		<navigator url="../tong_ji/index">
			<view class="item item5" hover-class="app-btn-active">
				<text>统计</text>
				<text>统计日常工作数据</text>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped="">
	.page {
		padding: 30upx 36upx;
	}

	.item {
		position: relative;
		height: 176upx;
		width: 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin: 0 auto 30upx auto;

		>text {
			display: block;
			color: white;
		}

		>text:nth-child(1) {
			font-size: 40upx;
			padding-top: 34upx;
			margin-left: 40upx;
		}

		>text:nth-child(2) {
			font-size: 28upx;
			margin-top: 16upx;
			margin-left: 40upx;
		}
	}

	.item1 {
		background-image: url('../../static/juminganjian.png');
	}

	.item2 {
		background-image: url('../../static/gongshanganjian.png');
	}

	.item3 {
		background-image: url('../../static/zhishiku.png');
	}

	.item4 {
		background-image: url('../../static/tongzhigonggao.png');
	}

	.item5 {
		background-image: url('../../static/tongji.png');
	}
</style>
