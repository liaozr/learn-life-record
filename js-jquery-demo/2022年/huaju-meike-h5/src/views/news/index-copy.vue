<template>
  <div class="container">
     <div class="banner">
        <img src="~/assets/images/news/banner.png" alt="">
     </div>
    <div class="section section9 newlist">
        <div class="listhead flex-center-between">
           <div @click="changeItem(0)"  class="item" :class="{'active':curIndex == 0}">
              公司新闻
           </div>
           <div @click="changeItem(1)"  class="item" :class="{'active':curIndex == 1}">
              美业热点
           </div>
           <div @click="changeItem(2)"  class="item" :class="{'active':curIndex == 2}">
              运营知识
           </div>
        </div>
        <div class="section_box content">
            <van-loading size="36" color="#C000FF" class="flex-center-center vanloading" v-if="newList.length == 0  " />
            <div @click="gotoDetail(item)" v-for="item in newList" :key="item.id" class="list flex-center-between">
               <div class="img">
                 <img :src="item.imgUrl" alt="">
               </div>
               <div class="wen">
                  <div class="title">{{item.contentTitle}}</div>
                  <div class="subtitle">{{item.createDate}}</div>
               </div>
            </div>
        </div>
        <van-pagination
          class="pagination"
          v-model="currentPage"
          @change="changepage"
          :total-items="total"
          :items-per-page="3"
          :show-page-size="3"
          force-ellipses
        />
    </div>
    <pagefooter></pagefooter>
  </div>
</template>

<script>
import { getNewsList } from '@/api/user.js'
export default {
  data() {
    return {
      curIndex: 0,
      currentPage:1,
      total:0,
      newsID:182,
      serviceUrl:'https://admin.hjtc123.com',
      newList:[]
    }
  },
  computed: {
  },
  mounted() {

  },
  activated(){
   this.getNewsList()
   this.$nextTick(() => {
     this.$wow.init()
   })
  },
  methods: {
    gotoDetail(item) {
      this.$router.push({
        name: 'newsDetail',
        params: {
          id: item.id
        }
      })
    },
    async getNewsList(){
       this.newList= []
       let params = {
         pageNo:this.currentPage,
         pageSize:3,
         contentCategoryId:this.newsID
       }
       try{
         const res = await getNewsList(params)
         this.total = res.data.total
         let data = res.data.rows
         this.newList = data
         sessionStorage.meikenewList = JSON.stringify(data)
         this.newList.forEach((item) =>{
           if(!item.imgUrl){
             let path = this.serviceUrl+JSON.parse(item.contentImg)[0].path
             this.$set(item,'imgUrl',path)
           }
         })
       }catch(e){
         console.log(e)
       }
    },
    changepage(page){
      this.currentPage = page
      this.newList = []
      this.getNewsList()
    },
    changeItem(index) {
      this.curIndex = index
      this.currentPage = 1
      this.total = 0
      console.log(index)
      if(index == 0 ){
        this.newsID = 182
      }
      if(index == 1 ){
        this.newsID = 183
      }
      if(index == 2 ){
        this.newsID = 184
      }
      this.getNewsList()
    }
  }
}
</script>
<style lang="scss" scoped>
   .container{
     .section1{
       .subtitle{
         font-size: 13px;
         font-family: Microsoft YaHei;
         font-weight: 400;
         color: #666666;
         width:90%;
         margin:0 auto;
         margin-top:10px;
         text-align: center;
         line-height: 20px;
       }
       .section_box{
          display: flex;
          flex-wrap: wrap;
          align-items:top;
          margin:0 auto;
          margin-top:20px;
          .list{
              display: inline-block;
              width: 48%;
              margin: 0 auto;
              margin-bottom:20px;
              background: #FFFFFF;
              border-radius: 5px;
              &.list1{
                height:370px;
              }
              &.list3{
                margin-top:-30px;
              }
              img{
                height:110px;
                width:100%;
              }
              .wen{
                padding:10px;
                box-sizing: border-box;
                .title{
                  font-size: 14px;
                  font-family: Microsoft YaHei;
                  font-weight: bold;
                  color: #1A1A1A;
                  margin-bottom:10px;
                }
                .desc{
                  font-size: 12px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #666666;
                  line-height: 20px;
                }
              }
          }
       }
     }
  }
  .pagination{
    margin-top:20px;
    ::v-deep .van-pagination__item--active {
        color: #fff !important;
        background-color: #C000FF;
    }
    ::v-deep .van-pagination__item {
        color: #C000FF;
    }
    ::v-deep  .van-pagination__item--disabled, .van-pagination__item--disabled:active {
        color: #646566;
    }
    ::v-deep .van-pagination__item:active{
      background-color:transparent;
      color:#C000FF;
    }
  }
</style>
