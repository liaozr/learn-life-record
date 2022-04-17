<template>
	<view v-if="detail.contentTitle" class="news_detail">
		<text class="title">{{detail.contentTitle}}</text>
		<view class="info">
			<text>发表时间：{{detail.createDate | formatDate}}</text>
			<text>浏览：{{detail.contentHit}}</text>
		</view>
		<view class="content news-detail-content">
			<rich-text :nodes="detail.contentDetails"></rich-text>
		</view>
		
		<!-- 使用uni 的 扩展组件 -->	
		<view class="goods_nav">
		   <uni-goods-nav :fill="true"  		   
		   :options="options" :buttonGroup="buttonGroup"  	   
		   @click="onClick" @buttonClick="buttonClick" />   
		</view>
			
	</view>
</template>
<script>
	import { getNewsDetail }  from '../../api/index.js'
	export default {
		data() {
			return {
			  detail:{},
			  options: [
					{
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/kefu.png',
						text: '客服'
					}, {
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png',
						text: '店铺'
					}, {
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
						text: '购物车',
						info: 12
					},
			   ],
			   buttonGroup: [
					{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
			    ]
			}
		},
		onLoad(option){
		  let id = option.id
		  this.getNewsDetail(id)
		},
		methods: {
		  async getNewsDetail(id){
			  try{
				let params = {id}
			  	const res = await getNewsDetail(params)
				this.detail = res.data.data			
			  }catch(e){
			  	//TODO handle the exception
			  }
		  },
		  onClick (e) {
			// uni.showToast({
			// 	title: `点击${e.content.text}`,
			// 	icon: 'none'
			// })
			console.log(e)
		  },
		  buttonClick (e) {
			console.log(e)
			// this.options[2].info++
		  }	
		}
	}
</script>
<style lang="scss">
	.news_detail{
		font-size: 30rpx;
		padding: 0 20rpx;
		.title{
			text-align: center;
			width: 710rpx;
			display: block;
			margin: 20rpx 0;
		}
		.info{
			font-size:24rpx;
			color:#999;
			width:93%;
			margin:0 auto;
			display: flex;
			justify-content: space-between;
		}
	}
	
	.goods_nav {
		position: fixed;
		bottom:0;
		width: 100%;
	}
	
	.line {
		height: 10rpx;
		width: 750rpx;
		background: #eee;
	}
</style>