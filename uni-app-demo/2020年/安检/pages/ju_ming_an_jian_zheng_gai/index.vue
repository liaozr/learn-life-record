<template>
	<view class="page">
		<view class="app-item divider2">
			<text class="app-left-text2">安检单号</text>
			<text class="app-right-text1">{{param.scBillno}}</text>
		</view>
		<view class="app-item divider2">
			<text class="app-left-text2">门牌号</text>
			<text class="app-right-text1">{{param.customerDoorNo}}</text>
		</view>
		<view class="app-item divider2">
			<text class="app-left-text2">客户名称</text>
			<text class="app-right-text1">{{param.customerName}}</text>
		</view>
		<view class="app-item divider2">
			<text class="app-left-text2">区</text>
			<text class="app-right-text1">{{param.customerAreaName}}</text>
		</view>
		<view class="app-item divider2">
			<text class="app-left-text2">街道</text>
			<text class="app-right-text1">{{param.customerStreetName}}</text>
		</view>
		<view class="app-item divider2">
			<text class="app-left-text2">社区</text>
			<text class="app-right-text1">{{param.customerCommunityName}}</text>
		</view>
		<view class="app-item divider2">
			<text class="app-left-text2">详细地址</text>
			<text class="app-right-text1">{{param.customerAdd}}</text>
		</view>
		<view class="app-item divider2">
			<text class="app-left-text2">联系电话</text>
			<text class="app-right-text1">{{param.customerPhone}}</text>
		</view>
		<view class="app-item divider2">
			<text class="app-left-text2">截止日期</text>
			<text class="app-right-text1">{{param.safetyEndTime.split(' ')[0]}}</text>
		</view>
		<view class="app-item divider1">
			<text class="app-left-text2">安检小结</text>
			<text class="app-right-text1">{{param.remark}}</text>
		</view>
		<view class="app-item">
			<view class="app-text-badge"></view>
			<text class="app-left-text1">{{customerType == '10' ? '居民安全隐患' : '大型工商安全隐患'}}</text>
			<text v-if="param.safetyTaskPartList" class="flex1 danger-num">({{param.safetyTaskPartList.length}})</text>
			<!-- 	<view class="uni-icon uni-icon-arrowdown"></view> -->
		</view>
		<view v-if="customerType=='10'" class="divider1">
			<view class="list-head">
				<text style="flex: .5;">序号</text>
				<text style="flex: 1;">检查部位</text>
				<text style="flex: 1.5;">用户安全风险现状</text>
				<text style="flex: 1.5;">措施建议</text>
			</view>
			<view v-if="param.safetyTaskPartList" class="list-item divider2" v-for="(item,index) in param.safetyTaskPartList">
				<text style="flex: .5;">{{index+1}}</text>
				<text style="flex: 1;">{{item.dangerName}}</text>
				<text style="flex: 1.5;padding: 0 5px;">
					<text v-if="child.type == '10'" v-for="(child,index1) in item.safetyPartDangerSuggestList">
						{{child.dangerOrMeasureName}},
					</text>
				</text>
				<text style="flex: 1.5;">
					<text v-if="child.type == '20'" v-for="(child,index2) in item.safetyPartDangerSuggestList">
						{{child.dangerOrMeasureName}},
					</text>
				</text>
			</view>
		</view>
		<view v-else="" class="divider1">
			<view class="list-head">
				<text style="flex: 2;">序号</text>
				<text style="flex: 8;">检查部位</text>
			</view>
			<view v-if="param.safetyTaskPartList" class="list-item divider2" v-for="(item,index) in param.safetyTaskPartList">
				<text style="flex: 2;">{{index+1}}</text>
				<text style="flex: 8;">{{item.dangerName}}</text>
			</view>
		</view>
		<img-box :imageList="imgList" mode="show"></img-box>
		<button v-if="!isRectify" @tap="navigatorTo" class="app-save-btn">整改情况</button>
	</view>
</template>

<script>
	var view;
	export default {
		data() {
			return {
				param: {},
				imgList: [],
				isRectify: true,
			};
		},
		onLoad(param) {
			view = this;
			this.isRectify = uni.getStorageSync('isRectify');
			this.customerType = uni.getStorageSync('customerType');
			uni.setNavigationBarTitle({
				title: view.customerType == '10' ? '居民安检整改' : '大型工商安检整改',
			})
			this.param = JSON.parse(param.data);
			console.log(this.param)

			this.imgList = this.param.safetyTaskPhotoList.map(item => {
				return view.BASE_URL + item.photoOriginalUrl.replace(/\\\\/g, '/');
			});
			
			console.log(this.imgList);
		},
		methods: {
			navigatorTo() {
				uni.navigateTo({
					url: '../xian_chang_zheng_gai_qing_kuang/index?taskId=' + this.param.id,
				})
			}
		}
	}
</script>

<style lang="scss" scoped="">
	.page {
		padding-bottom: 180upx;
	}

	.danger-num {
		font-size: 32upx;
		color: red;
		font-weight: bold;
		margin-left: 20upx;
		line-height: 44upx;
	}

	.list-head {
		border-top: 1px solid #DDDDDD;
		border-bottom: 1px solid #DDDDDD;
		height: 96upx;
		display: flex;
		align-items: center;
		background: #F9F9F9;

		>text {
			font-size: 24upx;
			color: #000000;
			text-align: center;
		}
	}

	.list-item {
		padding: 24upx 0;
		display: flex;
		align-items: center;

		text {
			font-size: 24upx;
			color: #000000;
			text-align: center;
		}
	}
</style>
