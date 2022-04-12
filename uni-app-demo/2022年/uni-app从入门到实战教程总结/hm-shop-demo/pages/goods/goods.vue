<template>
	<view>
		<goodsList :data="goodslists"></goodsList>
	</view>
</template>

<script>
	import goodsList from '../../components/goodsList/goodsList.vue' 
	import { getNewsList }  from '../../api/index.js'	
	export default {
		data() {
			return {
			 pageNo:1,
			 pageSize:10,
			 baseUrl:'https://admin.hjtc123.com/',
			 goodslists:[]
			}
		},
		// onLoad事件里面一般放的是进入页面要请求的数据
		onLoad(){
		  this.getNewsList()	
		},
		components:{
	      goodsList		
		},
		methods: {
		  async getNewsList(){
			  try{			
			  	let params = {
					pageNo:this.pageNo,
					pageSize:this.pageSize,
					contentCategoryId:182				
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
				this.goodslists = goodslists	
				
			  }catch(e){
			  	//TODO handle the exception
			  }
		  }
		}
	}
</script>

<style>

</style>
