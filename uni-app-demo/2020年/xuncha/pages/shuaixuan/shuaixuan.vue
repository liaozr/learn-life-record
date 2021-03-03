<template>
	<view class="shuaixuan">
		<view class="content">
			 <view class="itemlist">
				  <view class="head">
					  <text>逾期</text>
				  </view>
				  <view @click="choseyuqi(1)" class="list" :class="{'active':curindex == 1}">
					  未逾期
				  </view>
				  <view @click="choseyuqi(2)" class="list" :class="{'active':curindex == 2}">
				  	  已逾期
				  </view>
			 </view>
			 <view class="itemlist">
				  <view class="head">
					  <text>任务类型</text>
				  </view>
				  <view class="list active">
					  所有
				  </view>
				  <view class="list">
					  隐患督办
				  </view>
				  <view class="list">
				  	  站点巡查
				  </view>
			 </view>
		</view>
		<view @click="sureshuaixuan" class="shangbaobtn">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			   curindex:1,
			   overdue:'N'
			};
		},
		methods:{
			choseyuqi:function(num){
				console.log(num)
				this.curindex = num
				if(num == 1){
					this.overdue = 'N'
				}else{
					this.overdue = 'Y'
				}
			},
			sureshuaixuan:function(){
				uni.setStorageSync('zhandianisOverdue',this.overdue)
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style scoped>
		
    .shuaixuan .content{
		padding:40upx;
	}
	.shuaixuan .itemlist{
		width:100%;
		margin-bottom:40upx;
	}
	.shuaixuan .itemlist .head{
		font-size:32upx;
		color:#000;
		margin-bottom:30upx;
	}
	.shuaixuan .itemlist .list{
		width:36%;
		margin-left:4%;
		height:72upx;
		line-height: 72upx;
		display: inline-block;
		margin-right:40upx;
		background: #F7F7F7;
        border-radius:8upx;
		color:#8B8B8B;
		text-align: center;
		font-size:28upx;
		margin-bottom:40upx;
	}
	.shuaixuan .itemlist .list.active{
		background: #02B360;
		border-radius:8upx;
		color:white;
	}
	.shuaixuan .shangbaobtn{
	 	   width:90%;
	 	   height:90upx;
	 	   line-height: 90upx;
	 	   text-align: center;
	 	   background-color:#02B360;
	 	   color:white;
	 	   font-size:32upx;
	 	   border-radius: 8upx;
	 	   margin:40upx auto; 
		   position: absolute;
		   left:0;
		   right:0;
		   bottom:60upx;
	}
</style>
