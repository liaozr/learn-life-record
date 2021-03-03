 <template>
 	<view>
 		<search-view @search="onsearch"></search-view>
 		<view class="divider1" v-for="(item,index) in list" :key="index">
 			<view @tap="item.show = !item.show" class="app-item divider3" hover-class="app-item-active">
 				<view class="app-text-badge"></view>
 				<text class="app-left-text1 flex1">{{item.knowledgeDirectoryName}}</text>
 				<view class="uni-icon uni-icon-arrowdown"></view>
 			</view>
 			<view v-show="item.show" ref="box">
 				<view :key="child.id" @tap="clickDir(child)" class="item divider3" v-for="(child,index1) in item.childrenDirectoryList"
 				 hover-class="app-item-active">
 					<text class="app-left-text2 flex1">{{child.directoryName}}</text>
 					<view class="uni-icon uni-icon-arrowright"></view>
 				</view>
 				<view :key="child.id" @tap="clickDoc(child)" class="item divider3" v-for="(child,index2) in item.knowledgeLibraryList"
 				 hover-class="app-item-active">
 					<text class="app-left-text2 flex1">{{child.fileName}}</text>
 				</view>
 			</view>
 		</view>
 		<empty-view v-if="list.length === 0"></empty-view>
 	</view>
 </template>
 
 <script>
 	var view;
 
 	export default {
 		data() {
 			return {
 				list: []
 			};
 		},
 		onLoad(param) {
 			view = this;
 			getData(param.id);
 		},
 		methods: {
 			onsearch(value) {
 				console.log(this.$refs.box)
 			},
 			clickDir(child) {
 				uni.navigateTo({
 					url: '../qiyezhishiKu/qiyezhishiKu?id=' + child.id,
 				})
 			},
 			clickDoc(child) {
 				downloadFile(child);
 			}
 		}
 	}
 
 	function downloadFile(item) {
 		uni.showLoading({
 			title: '正在下载',
 		})
 
 		console.log(JSON.stringify(item));
 		let accessoryUrl = item.fileUrl.replace(/\\/g, '/');
 
 		uni.downloadFile({
 			url: view.BASE_URL + accessoryUrl,
 			success(res) {
 				uni.hideLoading();
 				console.log(JSON.stringify(res));
 				if (res.statusCode == 200) {
 					var filePath = res.tempFilePath;
 					//saveFile(filePath, item, index);
 					openFile(filePath);
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
 
 	function openFile(filePath) {
 
 		uni.openDocument({
 			filePath: filePath,
 			success: function(res) {
 				console.log(JSON.stringify(res));
 				console.log('打开文档成功');
 
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
 
 	function getData(id) {
 
 		view.$request({
 			url: 'listKnowledgeLibrary',
 			data: {
 				knowledgeDirectoryId: id || '',
 			},
 			showLoading: true,
 			success(res) {
 				if (res.status == true) {
 					view.list = res.data.map((item, index) => {
 						item.show = index === 0;
 						return item;
 					});
 				}
 			}
 		})
 	}
 </script>
 
 <style  scoped="">
 	.item {
 		display: flex;
 		padding: 28upx 0upx 28upx 20upx;
 		margin: 0 40upx 0 40upx;
 		font-size: 30upx; 
 	}
	.item:last-child{
		border-bottom: none;
	}
 </style>
 