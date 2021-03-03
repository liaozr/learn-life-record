<template>
	<view class="app-page">
		<view class="tab-box divider3">
			<view @tap="onTabChange(0)">
				<text :class="{green:index === 0}" class="tab-text">未整改</text>
				<text :class="{'active-line':index === 0}" class="line"></text>
			</view>
			<view @tap="onTabChange(1)">
				<text :class="{green:index === 1}" class="tab-text">已整改</text>
				<text :class="{'active-line':index === 1}" class="line"></text>
			</view>
		</view>
		<search-view @search="onSearch" placeholder="请输入安检单号/客户姓名/联系电话"></search-view>
		<view style="height: 1px;" class="divider3"></view>

		<swiper :current='index' @change="swiperChange" class="flex1">
			<swiper-item v-for="(child,index) in swiper" :key="index">
				<scroll-view @scrolltolower="scrolltolower" style="height: 100%;" scroll-y="true">
					<empty-view v-if="child.list.length === 0"></empty-view>
					<view @tap="onItemClick(item)" class="divider3 item" v-for="(item,index1) in child.list" hover-class="app-item-active"
					 :key="index1">
						<view class="col1">
							<view class="app-text-badge"></view>
							<text class="app-left-text1">{{item.customerName}}/{{item.customerPhone}}</text>
							<text v-if="item.safetyTaskPartList.length > 0" class="bedge">有隐患</text>
						</view>
						<view class="col">
							<text>详细地址：</text>
							<text>{{item.customerAdd}}</text>
						</view>
						<view class="col">
							<text>安检日期：</text>
							<text>{{item.createTime}}</text>
						</view>
						<view class="col">
							<text>截止日期：</text>
							<text>{{item.safetyEndTime}}</text>
						</view>
						<view class="col">
							<text>整改次数：</text>
							<text>{{item.customerSafetyQty}}</text>
						</view>
					</view>
					<load-more v-if="child.list.length >= 5" :loadingType="child.loadingType"></load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	let view;

	export default {
		data() {
			return {
				index: 0,
				query: '',
				swiper: [{
						page: 1,
						list: [],
						loadingType: 0,
						isRectify: '20'
					},
					{
						page: 1,
						list: [],
						loadingType: 0,
						isRectify: '10'
					}
				],
				swipe2Loaded: false,
				customerType: '10',
			};
		},
		onLoad(param) {
			view = this;
			this.customerType = param.customerType;
			getList();
		},
		onShow() {
			if (uni.getStorageSync('hasChange')) { //回退到此页面时判断是否需要刷新
				this.swipe2Loaded = false,
					uni.setStorageSync('hasChange', false);
				let item = view.swiper[view.index];
				item.page = 1;
				item.loadingType = 0;
				getList();
			}
		},
		onPullDownRefresh() {
			let item = view.swiper[view.index];
			item.page = 1;
			item.loadingType = 0;
			getList();
		},
		methods: {
			swiperChange(e) {
				console.log(e);
				this.onTabChange(e.detail.current);
			},
			onTabChange(index) {
				this.index = index;
				if (index == 1 && !this.swipe2Loaded) {
					this.swipe2Loaded = true;
					getList();
				}
			},
			onItemClick(item) {
				uni.setStorageSync('isRectify', this.index == 1);
				uni.setStorageSync('customerType', view.customerType);
				uni.navigateTo({
					url: '../ju_ming_an_jian_zheng_gai/index?data=' + JSON.stringify(item)
				})
			},
			scrolltolower() {
				let item = view.swiper[view.index];
				if (item.loadingType == 0) {
					item.page++;
					item.loadingType = 1;
					getList();
				}
			},
			onSearch(query) {
				let item = view.swiper[view.index];
				this.query = query;
				item.page = 1;
				uni.showLoading({
					title: '正在搜索',
				})
				getList();
			}
		}
	}

	function getList() {

		let item = view.swiper[view.index];

		view.$request({
			url: 'FINDCUSTOMERSAFETYTASKAUDIT',
			method: 'POST',
			data: {
				query: view.query,
				page: item.page.toString(),
				pageSize: '10',
				isRectify: item.isRectify,
				customerType: view.customerType
			},
			success: (res) => {
				if (res.status == true) {
					res.data.forEach(item => {
						item.createTime = item.createTime.split(' ')[0];
						item.safetyEndTime = item.safetyEndTime.split(' ')[0];
					})

					if (item.page == 1) {
						item.list = res.data;
					} else {
						item.list.push(...res.data);
					}

					if (res.data.length == 10) {
						item.loadingType = 0;
					} else {
						item.loadingType = 2;
					}
				}
			},
			complete() {
				uni.hideLoading();
				uni.stopPullDownRefresh();
			},
		});
	}
</script>

<style lang="scss">
	swiper-item {
		height: 100%;
	}

	.item {
		padding: 28upx 40upx;

		.col1 {
			display: flex;
			align-items: center;
		}

		.bedge {
			margin-left: 20upx;
			border: 1px solid #E0223D;
			border-radius: 4px;
			padding: 3upx 6upx;
			font-size: 28upx;
			color: #E0223D;
		}

		.col {
			margin-top: 10upx;

			>text:nth-child(1) {
				color: #8B8B8B;
			}

			>text:nth-child(2) {
				color: #000000;
			}
		}
	}

	.tab-box {
		display: flex;

		>view {
			text-align: center;
			flex: 1;
			font-weight: bold;
			font-size: 32upx;
			color: #8B8B8B;
		}

		.tab-text {
			display: block;
			margin: 20upx;
		}

		.line {
			margin: 0 auto;
			display: block;
			height: 4upx;
			width: 50upx;
			background: #8B8B8B;
			border-radius: 1px;
		}

		.active-line {
			background: #02B360;
		}
	}
</style>
