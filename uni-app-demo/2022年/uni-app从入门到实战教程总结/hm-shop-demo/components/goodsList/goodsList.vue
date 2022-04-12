<template>
	<view class="goodslist">
		<view v-for="(item,index) in data" :key="item.id" class="list" >
			<image :src="item.imageUrl"></image>
			<view>{{item.contentTitle}}</view>
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
  .goodslist{
	  width:96%;
	  margin:0 auto;
	  margin-top:20rpx;
	  display: flex;
	  flex-wrap:wrap;
	  align-items:stretch;
	  padding-bottom:20rpx;
	  margin-bottom:40rpx;
	  .list{
		width:47%;
		border:1px solid #ddd;
		box-sizing: border-box;
		margin:5rpx auto;
		display: inline-block;
		margin-bottom:20rpx;
		image{
			width:100%;
			height:340rpx;
		}
		view{
			padding:20rpx;
			font-size:28rpx;
			line-height: 40rpx;
			text-align: left;
		}		
	  }
  }
</style>
