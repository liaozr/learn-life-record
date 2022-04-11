<template>
	<view class="home">
		<swiper indicator-dots circular>
			<swiper-item>
				<image src="../../static/images/banner.png"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/images/banner2.png"></image>
			</swiper-item>
		</swiper>
		<view class="nav">
			<view @click="navTo(item.path)" class="list" v-for="item in navs" :key="item.id">
				<view :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { getNewsList }  from '../../api/index.js'	
	export default {
		data() {
			return {
			  navs: [
				{
					icon: 'iconfont icon-ziyuan',
					title: '黑马超市',
					path: '/pages/goods/goods'
				},
				{
					icon: 'iconfont icon-guanyuwomen',
					title: '联系我们',
					path: '/pages/contact/contact'
				},
				{
					icon: 'iconfont icon-tupian',
					title: '社区图片',
					path: '/pages/pics/pics'
				},
				{
					icon: 'iconfont icon-shipin',
					title: '学习视频',
					path: '/pages/videos/videos'
				}
			  ]
			}
		},
		onLoad() {
         // 测试获取新闻列表
		 this.getNewsList()
		},
		methods: {
		 async getNewsList(){
			 try{
				 // 两种请求方式都可以。
			 	const res = await getNewsList()
				// const res = await this.$request({
				// 	url: '/content/list'
				// })
			 	console.log(res)
			 	console.log(7777)
			 }catch(e){
				 console.log(e)
			 	//TODO handle the exception
			 }	
		 },
		 navTo(path){
			 
		 }
		}
	}
</script>
<!-- 设计稿是用750的设计稿 -->
<!-- scss里面的css单位是rpx,而不是px -->
<!-- 这里面的单位用rpx,而不是用px-->
<!-- 
.home{
  swiper{
	  width:100%;
	  height:380rpx;
	  image{
		width:100%;
		height:380rpx;
	  }
  }
} -->
<style lang="scss" scoped>
	.home{
	  swiper{
		  width:100%;
		  height:380rpx;
		  image{
			width:100%;
			height:380rpx;
		  }
	  }
	  .nav {
		display: flex;
		.list{
			width: 25%;
			text-align: center;
			view{
				width: 120rpx;
				height: 120rpx;
				background: $shop-color;
				border-radius:60rpx;
				margin: 10px auto;
				line-height: 120rpx;
				color: #fff;
				font-size: 50rpx;
			}
			.icon-tupian{
				font-size: 45rpx;
			}
			text{
				font-size: 30rpx;
			}
		}
	  }
	}
</style>
