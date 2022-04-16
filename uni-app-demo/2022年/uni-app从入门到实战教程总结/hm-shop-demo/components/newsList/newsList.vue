<template>
	<view class="newsList">
		 <view v-for="item in data" :key='item.id' class="list">
			<image :src="item.imageUrl"></image>
			<view class="wen">
				<view class="title">{{item.contentTitle}}</view>
				<view class="subtitle">
					<text>发布时间：2012-12-04</text>
					<text>浏览：1212</text>
				</view>
			</view>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {		
			}
		},
		props:{
		 data:{
			 type:Array,
			 default:[]
		 }	
		},
		methods: {		
		}
	}
</script>

<style lang="scss">
   .newsList{
	   width:95%;
	   margin:0 auto;
	   padding-top:20rpx;
	  .list{
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  border-bottom:1px solid #eee;
		  margin-bottom:20rpx;
		  width:100%;
		  image{
			min-width: 200rpx;
			max-width: 200rpx;
			height: 150rpx;
		  }
		  .wen{
			  margin-left:30rpx;
			  padding-right:10rpx;
			  flex:1;
			  .title{
				  font-size:28rpx;
			  }
			  .subtitle{
				  margin-top:10rpx;
				  font-size: 24rpx;
				  color:#999;
				  text{
					&:last-child{
					   margin-left:30rpx;
					}  
				  }
			  }
		  }
	  }  
   }
</style>
