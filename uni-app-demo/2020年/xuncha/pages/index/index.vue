<template>
	<view class="content">
        <!-- <image class="logo" src="../../static/logo.png"></image> -->
		<view class="contentlayout">
			
			<view @click="gotodetail(1)" class="list">
				<view class="wenzi">
					 <text style="font-size:40upx;color:white;display: block;margin-bottom: 10upx;">站点巡查</text>
					 <text style="font-size:28upx;color:white;">对站点进行巡查上报</text>
				</view>
				<image class="logo" src="../../static/images/icon-xuncha.png"></image>
			</view>
			
			<view  @click="gotodetail(2)" class="list">
				<view class="wenzi">
					 <text style="font-size:40upx;color:white;display: block;margin-bottom: 10upx;">站点整改核查</text>
					 <text style="font-size:28upx;color:white;">整改反馈后的站点核查</text>
				</view>
				<image class="logo" src="../../static/images/icon-zhenggai2.png"></image>
			</view>
			
			<view  @click="gotodetail(3)" class="list">
				<view class="wenzi">
					 <text style="font-size:40upx;color:white;display: block;margin-bottom: 10upx;">隐患督办</text>
					 <text style="font-size:28upx;color:white;">对重要任务检查并上报</text>
				</view>
				<image class="logo" src="../../static/images/icon-yinhuanduban.png"></image>
			</view>
			
			<view  @click="gotodetail(4)" class="list">
				<view class="wenzi">
					 <text style="font-size:40upx;color:white;display: block;margin-bottom: 10upx;">隐患督办核查</text>
					 <text style="font-size:28upx;color:white;">查看范围内的站点信息</text>
				</view>
				<image class="logo" src="../../static/images/icon-yinhuanduban.png"></image>
			</view>
			
			<view  @click="gotodetail(5)" class="list">
				<view class="wenzi">
					 <text style="font-size:40upx;color:white;display: block;margin-bottom: 10upx;">我的任务</text>
					 <text style="font-size:28upx;color:white;">管理所有任务记录</text>
				</view>
				<image class="logo" src="../../static/images/icon-mytask.png"></image>
			</view>
			
			<view  @click="gotodetail(6)" class="list">
				<view class="wenzi">
					 <text style="font-size:40upx;color:white;display: block;margin-bottom: 10upx;">统计</text>
					 <text style="font-size:28upx;color:white;">统计日常工作记录</text>
				</view>
				<image class="logo" src="../../static/images/icon-tongji.png"></image>
			</view>
		</view>				
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello zrliao'
			}
		},
		onLoad() {

		},
		methods: {
			 gotodetail:function(num){
				 if(num == 1){
					 uni.navigateTo({
					     url: '../zhandianXuncha/zhandianXuncha'
					 })
				 }
				 else if(num == 2){
					 uni.navigateTo({
					     url: '../zhandianZhenggaihecha/zhandianZhenggaihecha'
					 })
				 }
				 else if(num == 3){
					 uni.navigateTo({
						 url: '../yinhuanDuban/yinhuanDuban'
					 })
				 }
				 else if(num == 4){
					 uni.navigateTo({
						 url: '../zhenggaiHecha/zhenggaiHecha'
					 })
				 }
				 else if(num == 5){
					 uni.navigateTo({
						 url: '../myTasks/myTasks'
					 })
				 }
				 else{
					 uni.navigateTo({
						 url: '../tongji/index'
					 })
				 }							 
			 }
		}
	}
</script>

<style scoped>
	 .content{	
		 width:678upx;
		 height:100%;
		 margin:0upx auto;		
	 }
	 .contentlayout{
	 	position: absolute;
	 	bottom:100upx;
	 	top:20upx;
	 	width:678upx;
		margin:auto;
	 	overflow-y:auto;
	 }
	 .content .list{
		 width:100%;
		 height:176upx;
		 margin-bottom: 40upx;
		 position: relative;
		 /* background:url(../../static/images/icon-xuncha.png) no-repeat center center; */
	 }  
	 .content .list .wenzi{
		position:absolute;		 
		width:370rpx;
		height:110rpx;
		top:34rpx;
		left:40rpx;
	  }
	 .content .list .logo{
		 width:100%;
		 height:100%;
	 }
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
	/* .content .list{
		width:48%;
		height:176rpx;
		margin-bottom:40rpx;
		position:relative;
		display:inline-block;
		margin-left:1%;
		margin-right:1%;
	} */
 
</style>
