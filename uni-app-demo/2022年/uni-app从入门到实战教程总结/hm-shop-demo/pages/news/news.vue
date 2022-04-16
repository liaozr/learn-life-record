<template>
	<view v-if="goodslists.length >0" class="goodlist">
		<newsList :data="goodslists"></newsList>
		<view class="isOver" v-if="flag">-----我是有底线的-----</view>
	</view>
</template>

<script>
	import newsList from '../../components/newsList/newsList.vue' 
	import { getNewsList }  from '../../api/index.js'	
	export default {
		data() {
			return {
			 pageNo:1,
			 pageSize:10,
			 baseUrl:'https://admin.hjtc123.com/',
			 goodslists:[],
			 flag:false
			}
		},
		// onLoad事件里面一般放的是进入页面要请求的数据
		onLoad(){
		  this.getNewsList()	
		},
		// 上拉加载回调触发函数
		onReachBottom(){
			// 判断是否已请求完数据
            if(this.goodslists.length<this.pageNo*this.pageSize){
			  this.flag = true  
			}else{
			  console.log('触发上拉加载')
			  this.pageNo++
			  this.getNewsList()
			}	
		},
		// 监听触发了下拉刷新
		onPullDownRefresh() {
			console.log('下拉刷新了~')
			this.pageNo = 1
			this.goodslists = []
			this.flag = false
			// 请求回调，延迟1s等ajax请求回显的数据加载完成后关闭下拉刷新			
			setTimeout(()=>{
			  this.getNewsList(()=>{
				uni.stopPullDownRefresh()
			  })	
			},1000)
		},
		components:{
	      newsList		
		},
		methods: {
		  async getNewsList(callBack){
			  try{			
			  	let params = {
					pageNo:this.pageNo,
					pageSize:this.pageSize,
					contentCategoryId:184				
				}
				const res = await getNewsList(params)			
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
				this.goodslists = [...this.goodslists,...goodslists]
						
				// 回调函数，这个回调函数是来判断当前的下拉刷新请求已经完成了。
				// 有回调函数就请求，无回调函数就不请求
				// 页面刚进来就会调用 getNewsList 这个方法,此时是不需要回调触发的
				// 所以，一定要加上  callBack && callBack()
				// 这样去判断  当有回调的时候才触发回调函数		
								
				callBack && callBack()	
										
			  }catch(e){
			  }
		  }
		}
	}
</script>

<style lang="scss">
  .goodlist{
	  background-color: #eee;
	  height:100%;
	  ::v-deep .list{
		  background-color:#fff;
	  }
  }
  .isOver {
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	font-size: 28rpx;
  }
</style>
