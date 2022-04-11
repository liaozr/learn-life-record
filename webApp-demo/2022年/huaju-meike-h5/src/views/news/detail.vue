<template>
  <div class="container">
    <div v-if="showflag" class="section flex-column-center">
		<div class="section_box">
			<div class="title">
				{{details.contentTitle}}
			</div>
			<div class="desctitle flex-start">
			   <div class="list">
				   <img src="~/assets/images/news/tb1.png" alt="">
				   <span class="wen">时间：{{details.createDate | formatDate}}</span>
			   </div>
			   <div class="list">
				   <img src="~/assets/images/news/tb2.png" alt="">
				   <span class="wen">作者：{{details.contentAuthor}}</span>
			   </div>
			   <div class="list">
				   <img src="~/assets/images/news/tb3.png" alt="">
				   <span class="wen">阅读量：{{details.contentHit}}</span>
			   </div>
			</div>
			<div class="content newsDetailContent flex-column-center">
				<div class="desc" v-html="details.contentDetails">
				</div>
			</div>
      <div class="tag">
         华钜美科
      </div>
		</div>
	</div>
  </div>
</template>

<script>
import { getNewsDetail } from '@/api/user.js'
export default {
  data() {
    return {
      newsID:'',
      showflag:false,
      details:{},
      newList:[]
    }
  },
  computed: {
  },
  mounted() {

  },
  activated(){
    this.details = {}
    this.showflag = false
    this.newsID = this.$route.params.id
    this.getNewsDetail()
    this.$nextTick(() => {
      this.$wow.init()
    })
  },
  filters:{
    formatDate(value){
      console.log(value)
      if(value?.length>10){
        return value.slice(0,10)
      }else{
        return value
      }
    }
  },
  methods: {
    async getNewsDetail(){
       let params = {
         id:this.newsID,
       }
       try{
         const res = await getNewsDetail(params)
         this.details = res.data
         this.showflag = true
       }catch(e){
         console.log(e)
       }
    }
  }
}
</script>
<style lang="scss" scoped>
  .container{
	.section{
	  .section_box{
		.title{
		  font-size: 17px;
		  font-family: Microsoft YaHei;
		  font-weight: bold;
		  color: #1A1A1A;
		  line-height: 25px;
		}
		.desctitle{
			margin-top:20px;
			.list{
			  margin-right:5px;
			  img{
				 width:16px;
				 height:16px;
				 vertical-align: middle;
			  }
			  .wen{
				  font-size: 12px;
				  font-family: Microsoft YaHei;
				  font-weight: 400;
				  color: #999999;
				  vertical-align: middle;
			  }
			}
		}
	  .content{
		  .desc{
			  font-size: 14px;
			  font-family: Microsoft YaHei;
			  font-weight: 400;
			  color: #1A1A1A;
			  opacity: 0.8;
			  line-height: 22px;
			  margin-top:20px;
        width:100%;
        overflow-x:hidden;
		  }
		}
	  }
	}
  }
  .tag{
    width: 100px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    font-size: 15px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #2C77F4;
    background: #EEF5FF;
    border-radius: 3px;
    margin-top:10px;
  }
  .newslist{
     margin-top:20px;
    .list{
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      margin-bottom:20px;
      height:35px;
      line-height: 35px;
      padding-left: 16px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      background-color: #EEF5FF;
    }
  }
</style>
