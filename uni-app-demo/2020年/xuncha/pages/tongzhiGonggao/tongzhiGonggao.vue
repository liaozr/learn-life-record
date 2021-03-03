 <template>
 	<view class="page">
 		<view class="tab-box divider3">
 			<view @tap="onTabChange(0)">
 				<text :class="{green:index === 0}" class="tab-text">未读</text>
 				<text :class="{'active-line':index === 0}" class="line"></text>
 			</view>
 			<view @tap="onTabChange(1)">
 				<text :class="{green:index === 1}" class="tab-text">已读</text>
 				<text :class="{'active-line':index === 1}" class="line"></text>
 			</view>
 		</view>
 
 		<view class="flex" style="align-items: center;">
 			<view class="flex1">
 				<search-view @search="onSearch"></search-view>
 			</view>
 			<navigator url="filter">
 				<view hover-class="app-item-active" style="margin-right: 20px; padding:0 4px;">
 					<text class="filter-text">筛选</text>
 					<image class="filter-img" src="../../static/images/filter.png"></image>
 				</view>
 			</navigator>
 		</view>
 		<view class="divider3 type-text">
 			<text v-if="noticeCategoryId">已选类型：{{noticeCategoryName}}</text>
 		</view>
 		<swiper :current='index' @change="swiperChange" class="flex1">
 			<swiper-item v-for="(item,index) in swiper" :key="index">
 				<scroll-view @scrolltolower="scrolltolower" style="height: 100%;" scroll-y="true">
 					<empty-view v-if="item.list.length === 0"></empty-view>
 					<view @tap="onItemClick(child)" class="item divider3" v-for="(child,index1) in item.list" hover-class="app-item-active" :key="index1">
 						<view class="flex" style="align-items: center;">
 							<view class="app-text-badge" style="vertical-align: bottom;"></view>
 							<text class="app-left-text2">{{child.title}}</text>
 							<view v-if="item.isRead == 'N'" style="position: relative;">
 								<view class="dot"></view>
 							</view>
 							<text class="date">{{child.releaseTime}}</text>
 						</view>
 						<text>{{child.remark}}</text>
 					</view>
 					<load-more v-if="item.list.length >= 5" :loadingType="item.loadingType"></load-more>
 				</scroll-view>
 			</swiper-item>
 		</swiper>
 	</view>
 </template>
 
 <script>
 	var view;
 	export default {
 		data() {
 			return {
 				index: 0,
 				query: '',
 				noticeCategoryId: '',
 				noticeCategoryName: '',
 				swiper: [{
 						page: 1,
 						list: [],
 						loadingType: 0,
 						isRead: 'N'
 					},
 					{
 						page: 1,
 						list: [],
 						loadingType: 0,
 						isRead: 'Y'
 					}
 				],
 				swipe2Loaded: false,
 			};
 		},
 		onPullDownRefresh() {
 			let item = view.swiper[view.index];
 			item.page = 1;
 			item.loadingType = 0;
 			getNotice();
 		},
 		onShow() {
 			let param = uni.getStorageSync('param');
 			if (param) {
 				if (this.noticeCategoryId != param.id) {
 					this.noticeCategoryId = param.id;
 					this.noticeCategoryName = param.categoryName;
 					getNotice();
 				}
 				uni.removeStorageSync('param');
 			}
 		},
 		onLoad() {
 			view = this;
 
 			getNotice();
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
 					getNotice();
 				}
 			},
 			onItemClick(item) {
 				if (item.noticeAccessoryList.length > 0) {
 					uni.showActionSheet({
 						itemList: item.noticeAccessoryList.map(item => item.accessoryName),
 						success(index) {
 							console.log(index);
 							downloadFile(item, index.tapIndex);
 						}
 					})
 				} else {
 					this.toast("该通知没有附件可以查看");
 				}
 
 			},
 			scrolltolower() {
 				let item = view.swiper[view.index];
 				if (item.loadingType == 0) {
 					item.page++;
 					item.loadingType = 1;
 					getNotice();
 				}
 			},
 			onSearch(query) {
 				let item = view.swiper[view.index];
 				this.query = query;
 				item.page = 1;
 				uni.showLoading({
 					title: '正在搜索',
 				})
 				getNotice();
 			}
 		},
 	}
 
 	function downloadFile(item, index) {
 		uni.showLoading({
 			title: '正在下载',
 		})
 
 		console.log(JSON.stringify(item));
 		let accessoryUrl = item.noticeAccessoryList[index].accessoryUrl.replace(/\\/g, '/');
 
 		uni.downloadFile({
 			url: view.BASE_URL + accessoryUrl,
 			success(res) {
 				console.log(JSON.stringify(res));
 				uni.hideLoading();
 				if (res.statusCode == 200) {
 					var filePath = res.tempFilePath;
 					//saveFile(filePath, item, index);
 					openFile(filePath, item, index);
 				} else {
 					view.toast("下载失败，没有找到要下载的资源");
 				}
 			},
 			fail(e) {
 				uni.hideLoading();
 				console.log(JSON.stringify(e));
 				view.toast("下载失败");
 			},
 		})
 	}
 
 	function saveFile(filePath, item, index) {
 
 		uni.saveFile({
 			tempFilePath: filePath,
 			success: function(res) {
 
 				console.log(JSON.stringify(res));
 				var savedFilePath = res.savedFilePath;
 
 				openFile(savedFilePath, item, index)
 			},
 			fail(e) {
 				console.log(JSON.stringify(e));
 				view.toast('保存文件失败');
 			}
 		});
 	}
 
 	function openFile(filePath, item, index) {
 
 		uni.openDocument({
 			filePath: filePath,
 			success: function(res) {
 				console.log(JSON.stringify(res));
 				console.log('打开文档成功');
 				console.log(item.noticeAccessoryList.length === index + 1);
 				if (item.noticeAccessoryList.length === index + 1) {
 					changeRead(item);
 				}
 			},
 			fail(e) {
 				console.log(JSON.stringify(e));
 				console.log('打开文档失败');
 				view.toast('打开文档失败');
 			}
 		});
 	}
 
 	function changeRead(item) {
 
 		view.$request({
 			url: 'saveReadNotice:' + item.id,
 			method: 'POST',
 			data: {},
 			success(res) {
 				if (res.status == true) {
 					console.log(JSON.stringify(res));
 				}
 			},
 		})
 	}
 
 
 	function getNotice() {
 
 		let item = view.swiper[view.index];
 
 		view.$request({
 			url: 'listNotice',
 			data: {
 				query: view.query,
 				noticeCategoryId: view.noticeCategoryId,
 				isRead: item.isRead,
 				page: item.page,
 				rows: '10',
 			},
 			success(res) {
 				if (res.status == true) {
 					res.data.forEach(item => {
 						if (item.releaseTime) {
 							item.releaseTime = item.releaseTime.split(' ')[0];
 						}
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
 		})
 	}
 </script>
 
 <style scoped="">
 	.page {
 		display: flex;
 		height: 100%;
 		flex-direction: column;
 	}
	.page swiper-item {
 			height: 100%;
 	}
 
 	.type-text {
 		min-height: 1px;
 	}
	.type-text >text {
 			padding-left: 42upx;
 			display: block;
 			padding-bottom: 32upx;
 			font-size: 28upx;
 			color: #8B8B8B;
 	}
 
 	.tab-box {
 		display: flex;	
 	}
	.tab-box >view {
 			text-align: center;
 			flex: 1;
 			font-weight: bold;
 			font-size: 32upx;
 			color: #8B8B8B;
 	}
	.tab-box .tab-text {
 			display: block;
 			margin: 20upx;
 	}
	.tab-box .line {
 			margin: 0 auto;
 			display: block;
 			height: 4upx;
 			width: 50upx;
 			background: #8B8B8B;
 			border-radius: 1px;
 	}
	.tab-box .active-line {
 			background: #02B360;
 	}
	
 
 	.filter-text {
 		font-size: 28upx;
 		color: #8B8B8B;
 	}
 
 	.filter-img {
 		vertical-align: middle;
 		margin-left: 12upx;
 		height: 30upx;
 		width: 32upx;
 	}
 
 	.item {
 		padding: 30upx 40upx;
 	}
	.item  .date {
 			flex: 1;
 			padding-left: 20upx;
 			text-align: right;
 			color: #8B8B8B;
 	}
	.item .dot {
 			position: absolute;
 			height: 16upx;
 			width: 16upx;
 			top: -10px;
 			left: 10px;
 			border-radius: 50%;
 			background: red;
 	}
	.item >text {
		display: block;
		padding-top: 30upx;
	}
	
 </style>
 