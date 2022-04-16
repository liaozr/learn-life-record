<template>
	<view class="pics">
		<scroll-view class="left" scroll-y>
		  <view @click="changeItem(item,index)" class="list" :class="{'active':curIndex == index}" v-for="(item,index) in list">
			  {{item.title}}
		  </view>	
		</scroll-view>
		<scroll-view class="right" :scroll-top="scrollTop" scroll-y="true">
			<view ref="rightContent" class="rightContent">
				<view v-for="item in datalist" :key="item.id" class="item">
					<image @click="preview(item.url)" :src="item.url"></image>
					<text>{{item.text}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  curIndex:0, 	
			  list:[
				  {
					  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  },
				  {
				  	  title:'家居生活'
				  }
			  ],	
			  datalist:[
				  {
					url:require("../../static/images/tp5.png"),
					text:'是的是的是的'
				  },
				  {
					url:require("../../static/images/tp4.png"),
					text:'是的是的是的'
				  },
				  {
					url:require("../../static/images/tp5.png"),
					text:'是的是的是的'
				  },
				  {
					url:require("../../static/images/tp4.png"),
					text:'是的是的是的'
				  },
			  ],
			  scrollTop:0
			}
		},
		methods: {
		   changeItem(item,index){
			   this.curIndex = index		       			
			   this.$nextTick(() =>{
				this.scrollTop = 0 
			   })
		   },
		   preview(currentUrl){
			 let urlArr = this.datalist.map((item) =>{
				return item.url 
			 })
			 uni.previewImage({
			 	urls:urlArr,
				current:currentUrl
			 })
		   }
		}
	}
</script>

<style lang="scss" scoped>
  page{
	height:100%;
  }
  .pics{
    height:100%;
	display: flex;
	.left{
	   height:100%;	
	   width:200rpx;
	   border-right: 1px solid #eee;
	  .list{
	  	width:100%;
		height:120rpx;
		line-height: 120rpx;
		text-align: center;
		color: #333;
		font-size: 30rpx;
		border-top:1px solid #eee;
		&.active{
			background-color:$shop-color;
			color:white;
		}
	  }	
	}
   .right{
		height: 100%;
		width: 520rpx;
		margin: 10rpx auto;
		.item{
			margin-bottom:10rpx;
			image{
				width: 520rpx;
				height: 520rpx;
				border-radius: 5px;
			}
			text{
				font-size: 30rpx;
				line-height: 60rpx;
			}
		}
   	}
  }
</style>
