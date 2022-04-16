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
		<!-- 推荐商品 -->
		<view class="hot_goods">
			<view class="tit">推荐商品</view>
		</view>
		<goodsList :data="goodslists"></goodsList>
	</view>
</template>

<script>
	import { getNewsList }  from '../../api/index.js'	
	import goodsList from '../../components/goodsList/goodsList.vue'
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
			  ],
			  baseUrl:'https://admin.hjtc123.com/',
			  goodslists:[]
			}
		},
		components:{
		  goodsList	
		},
		onLoad() {
         // 测试获取新闻列表
		 this.getNewsList()
		},
		methods: {
		 async getNewsList(){
			 try{
				 // 两种请求方式都可以。			
				 let params = {
					 pageNo:1,
					 pageSize:8,
					 contentCategoryId:184
				 }
			 	const res = await getNewsList(params)
				// const res = await this.$request({
				// 	url: '/content/list'
				// })
				let goodslists = res.data.data.rows
				goodslists.forEach((item) =>{
					if(!item.imageUrl){
						if(item?.contentImg){
							let arr = JSON.parse(item.contentImg)[0]
							let path = this.baseUrl+arr.path
							this.$set(item,'imageUrl',path)
						}			
					}					
				})
				this.goodslists = goodslists			
				console.log(this.goodslists)
			 }catch(e){
				 console.log(e)
			 	//TODO handle the exception
			 }	
		 },
		 navTo(path){
			uni.navigateTo({
			  url: path
			})
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
	  .hot_goods {
		background: #eee;
		overflow: hidden;
		margin-top: 20rpx;
		.tit{
			height: 100rpx;
			line-height: 100rpx;
			color: $shop-color;
			text-align: center;
			letter-spacing: 40rpx;
			background: #fff;
			margin: 7rpx 0;
		}
	   }
	}
</style>
