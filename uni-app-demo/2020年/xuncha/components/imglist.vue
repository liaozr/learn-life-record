<template>
	<view>
		<view @click="chooseImage2" class="list paizhao">	
			<text class='title'>意见整改</text>
			<text class='righttitle title'>右侧点击拍照或上传照片</text>
		</view>
		
		<view v-if="imageList2.length" class="photolist">
			<view class="list" v-for="(item,index) in imageList2" :key="index">
				<image @tap="previewImage2(item)" :src="item" :data-src="image"></image>
				<view @tap="imageList2.splice(index,1)" class="uni-icon uni-icon-closeempty"></view>
			</view>
		</view>
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

<style>

</style>
