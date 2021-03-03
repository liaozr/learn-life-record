<template>
	<view>
		<view class="app-item">
			<view class="app-text-badge"></view>
			<text class="app-left-text1">{{title}}</text>
		</view>
		<view class="img-box">
			<view v-for="(item,index) in imageList" :key="index">
				<image @tap="previewImage(item)" :src="item" :data-src="image"></image>
				<view @tap="imageList.splice(index,1)" class="uni-icon uni-icon-closeempty"></view>
			</view>
			<view v-show="imageList.length < max" @tap="chooseImage" class="uni-icon uni-icon-plusempty" hover-class="app-img-active">
			</view>
		</view>
	</view>
</template>

<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]

	export default {
		name: 'imgbox',
		props: {
			max: {
				type: Number,
				default: 5
			},
			title: {
				type: String,
				default: '图片'
			}
		},
		data() {
			return {
				imageList: [],
			}
		},
		methods: {
			chooseImage: async function() {

				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['compressed', 'original'],
					count: this.max - this.imageList.length,
					success: (res) => {
						console.log(res);
						this.imageList = this.imageList.concat(res.tempFilePaths);
					}
				})
			},
			previewImage: function(src) {
				uni.previewImage({
					current: src,
					urls: this.imageList
				})
			},
		}
	}
</script>

<style lang="scss">
	$imgSize:140upx;

	.img-box {
		padding: 0 44upx 0 64upx;

		>view {
			position: relative;
			float: left;
			height: $imgSize;
			width: $imgSize;
			margin-bottom: 20upx;
			margin-right: 20upx;

			>image {
				height: 100%;
				width: 100%;
			}
		}
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
		line-height: $imgSize;
		background: #F6F6F6;
		font-size: $imgSize;
		color: #D8D8D8;
		font-weight: bold;
	}

	.app-img-active {
		background: grey;
		opacity: .5;
	}
</style>
