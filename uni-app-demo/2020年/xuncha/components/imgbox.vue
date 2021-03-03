<template>
	<view>
		<view class="app-item">
			<view class="app-text-badge"></view>
			<text class="app-left-text1">{{title}}</text>
		</view>
		<view class="img-box">
			<view v-for="(item,index) in imageList" :key="index">
				<image @tap="previewImage(item)" :src="item" :data-src="image"></image>
				<view v-if="uploading" class="progress-box">
					<progress :percent="statusArr[index].percent" class="progress"></progress>
				</view>
				<view v-if="mode == 'edit'" @tap="deleteImg(index)" class="uni-icon uni-icon-closeempty"></view>
			</view>
			<view v-if="mode == 'edit'" v-show="imageList.length < max" @tap="chooseImage" class="uni-icon uni-icon-plusempty"
			 hover-class="app-img-active">
			</view>
		</view>
		<view style="clear: both;"></view>
	</view>
</template>

<script>
	var view;
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]

	export default {
		name: 'imgbox',
		props: {
			mode: { // 'show':显示模式 'edit':编辑模式
				type: String,
				default: 'edit',
			},
			imageList: {
				type: Array,
				default: () => {
					return [];
				}
			},
			max: {
				type: Number,
				default: 5
			},
			title: {
				type: String,
				default: '图片'
			},
			imgtype:{
				type: String,
				default: '意见整改'
			}
		},
		data() {
			return {
				uploading: false,
				uploadedImg: [],
				statusArr: []
			}
		},
		mounted() {
			view = this;
		},
		methods: {
			isEmpty() {
				return this.imageList.length === 0;
			},
			chooseImage: async function() {

				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['compressed', 'original'],
					count: this.max - this.imageList.length,
					success: (res) => {
						console.log(res);						
						this.imageList = [...new Set(this.imageList.concat(res.tempFilePaths))];
						if(this.imgtype !== '意见整改'){
						  this.$emit('uploadstate',this.imageList)	
						}else{
						  this.$emit('uploadzhenggai',this.imageList)		
						}						
					}
				})
			},
			previewImage: function(src) {
				uni.previewImage({
					current: src,
					urls: this.imageList
				})
			},
			getImageList() {
				return this.imageList;
			},
			deleteImg(index) {
				if (this.uploading) {
					view.toast('正在上传，请勿操作');
				} else {
					this.imageList.splice(index, 1);
				}

			},
			upload(callback) {
				if (this.isEmpty()) {
					callback([])
				} else {
					this.imageList.forEach(item => this.statusArr.push({
						percent:0,
					}));
					console.log(this.statusArr);
					this.uploading = true;
					this.uploadedImg = [];
					onUpload(0, callback)
				}
			}
		}
	}

	function onUploadBacth(callback) {

		let uploadTask = uni.uploadFile({
			url: view.BASE_URL + '/eidpws/wxTrace/wxImage/wxImageUploadSave', //仅为示例，非真实的接口地址
			files: view.imageList.map(item => {
				return {
					uri: item,
					name: 'SAFETY_TASK',
				}
			}),
			success: (uploadFileRes) => {
				console.log(JSON.stringify(uploadFileRes));
				let data = JSON.parse(uploadFileRes.data);
				console.log(JSON.stringify(data.data));
				let accessoryUrl = data.data[0].accessoryUrl;
				let fileName = data.data[0].fileKey;

				console.log(accessoryUrl);
				view.uploadedImg.push(data.data[0]);
				if (index != view.imageList.length - 1) {
					onUpload(++index, callback);
				} else {
					if (callback) {
						callback(view.uploadedImg);
					}
				}
			},
			complete() {
				this.uploading = false;
			}
		});

		uploadTask.onProgressUpdate((res) => {
			console.log('上传进度' + res.progress);
		});
	}

	function onUpload(index, callback) {

		let uploadTask = uni.uploadFile({
			url: view.BASE_URL + '/eidpws/wxTrace/wxImage/wxImageUploadSave', //仅为示例，非真实的接口地址
			filePath: view.imageList[index],
			name: 'WORK',
			success: (uploadFileRes) => {
				console.log(JSON.stringify(uploadFileRes));
				let data = JSON.parse(uploadFileRes.data);
				console.log(JSON.stringify(data.data));
				let accessoryUrl = data.data[0].accessoryUrl;
				let fileName = data.data[0].fileKey;

				console.log(accessoryUrl);
				view.uploadedImg.push(data.data[0]);
				if (index != view.imageList.length - 1) {
					onUpload(++index, callback);
				} else {
					view.uploading = false;
					if (callback) {
						callback(view.uploadedImg);
					}
				}
			},
			fail(e) {
				console.log(e);
				view.uploading = false;
				view.toast("图片上传失败");
			}
		});

		uploadTask.onProgressUpdate((res) => {
			view.statusArr[index].percent = res.progress;
			console.log(view.statusArr);
			console.log('上传进度' + res.progress);
		});
	}
</script>

<style>
	.img-box {
		padding: 0 44upx 0 64upx;

		
	}
	.img-box >view {
			position: relative;
			float: left;
			height: 140upx;
			width: 140upx;
			margin-bottom: 20upx;
			margin-right: 20upx;	
	}
	.img-box >view >image {
				height: 100%;
				width: 100%;
	}
	

	.progress-box {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		background: rgba(0, 0, 0, .6);

		
	}
	.progress-box .progress {
			position: absolute;
			top: 50%;
			border-radius: 4px;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 90%;
	}
	

	.uni-icon-closeempty {
		position: absolute;
		border-radius: 50%;
		right: -10upx;
		top: -20upx;
		font-size: 40upx;
		color: white;
		background: red;
		font-weight: bold;
	}

	.uni-icon-plusempty {
		line-height: 140upx;
		background: #F6F6F6;
		font-size:140upx;
		color: #D8D8D8;
		font-weight: bold;
	}

	.app-img-active {
		background: grey;
		opacity: .5;
	}
</style>