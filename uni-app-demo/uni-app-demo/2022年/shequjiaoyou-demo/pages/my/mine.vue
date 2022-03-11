<template>
	<view>
		 <view style='padding:20rpx;' class="flex align-center p-2" hover-class="bg-light">
			  <image src='../../static/demo/1.jpg'
			  style="width:100rpx;height:100rpx;border-radius: 100%;margin-right:20rpx;" class="rounded-circle"></image>   
		  </view>
		  <view style="margin-top:40rpx;padding:20rpx;">
			  <image src="../../static/demo/2.jpg" style="width:100%;height:170rpx;border-radius: 20rpx;;" mode="aspectFill"></image>
		  </view>
		  <view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
		},
		onLoad(){
		  console.log( this.$config.webUrl)		
		  console.log(this.$store.state.loginStatus)
		  console.log('更改登录loginStatus')
		  this.$store.commit("changeLoginStatus",'123')
		  console.log(this.$store.state.loginStatus)
		  
		  this.permission(() =>{
			 console.log('你已经登录了') 
		  })
		}
	}
</script>

<style>
	.flex{
		display: flex;
	}
</style>
