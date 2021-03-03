<template>
	<view class="content">
		<view class="main-box">
			<home v-if="index === 0"></home>
			<us v-else=""></us>
		</view>
		<view class="footer">			 
			<view @tap="index=0" class="list">
				<image v-if="index == 0" class="shouye" src="../../static/images/icon-shouye-lv.png"></image>
				<image v-else class="shouye" src="../../static/images/icon-shouye.png"></image>
				<text class="wenzi" :class="{'lvse':index == 0}">首页</text>
			</view>
			<view @tap="index=1" class="list">
				<image v-if="index == 0" class="us" src="../../static/images/icon-us.png"></image>
				<image v-if="index == 1" class="us" src="../../static/images/icon-us-lv.png"></image>
				<text class="wenzi" :class="{'lvse':index == 1}">我的</text>
			</view>
			<!-- <navigator url="/pages/us/us" class="list" hover-class="navigator-hover">
			       <image class="us" src="../../static/images/icon-us.png"></image>
			       <text class="wenzi">我的</text>
			</navigator> -->
		</view>
	</view>
</template>

<script>
	
	import home from '@/pages/index/index'
	import us from '@/pages/us/us'
	export default {
		components: {
			home,
			us
		},
		data() {
			return {
				index: 0,
			}
		}
	}
</script>

<style scoped>
    .footer .list{
		 font-size:28upx;
		 display:inline-block;
		 width:50%;
		 box-sizing: border-box;
		 text-align: center;
		 vertical-align: middle;
		 position: relative;
		 height:100%;
		 margin-bottom:0upx;
	 }
	 .footer{
	 		 position: absolute;
	 		 bottom:0;
	 		 left:0;
	 		 right:0;
	 		 height:100upx;
	 }
	 .footer .list .shouye{
		 width:40upx;
		 height:38upx;
		 position:absolute;
		 top:8%;
		 left:50%;
	 }
	 .footer .list .us{
	 		 width:38upx;
	 		 height:40upx;
	 		 position:absolute;
	 		 top:8%;
	 		 left:50%;
	 }
	 .footer .list .wenzi{
	 		 position: absolute;
	 		 left:42%;
	 		 top:50%;
	 		 width:100upx;
	}
	 .lvse{
		 color:#098942;
	 }
</style>
