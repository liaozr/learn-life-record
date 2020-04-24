<template>
  <div class="recommend" ref="recommend">
      <scroll ref='scroll' class="recommend-content" :lists="discList">
         <div>
              <div v-if='recommends.length' class="slider-wrapper">
                  <slider>
                    <div v-for="item in recommends" :key="item.id">
                      <a :href="item.linkUrl">
                        <img @load='loadImage' :src="item.picUrl" alt="">
                      </a>
                    </div>  
                  </slider>  
              </div>
              <div class="recommend-list">
                  <h1 class='list-title'>热门歌单推荐</h1> 
                  <ul>
                    <li @click="selectItem(item)" v-for='item in discList' class='item' :key='item.id' >
                        <div class="icon">
                          <!-- <img width='60' height='60' :src="item.imgurl" alt=""> -->
                          <img width='60' height='60' v-lazy="item.imgurl" alt="">
                        </div>
                        <div class="text">
                            <h2 class="name">{{item.creator.name}}</h2>
                            <p class='desc'>{{item.dissname}}</p>
                        </div>
                    </li>
                  </ul>  
              </div>
         </div>
         <div class="loading-container" v-show='!discList.length'>
              <loading></loading>
         </div>
      </scroll>
      <router-view></router-view>
  </div>
</template>

 <script type="text/ecmascript-6">
 
  import { getRecommend , getDiscList2 , getMovie } from '@a/recommend'
  import { ERR_OK } from 'assets/js/config'

  import scroll from '@c/scroll/scroll'
  import slider from '@c/slider/slider'
  import loading from '@c/loading/loading'

  import { playlistMixin } from 'assets/js/mixin'


  export default {
    mixins:[playlistMixin],
    data() {
      return { 
        recommends:[],
        discList:[],
        silderflag:false
      }
    },
    components:{
      slider,
      scroll,
      loading
    },
    watch:{

      // 等 banner部分轮播的 ajax请求 完成之后，再去请求歌单 数据的接口，为了
      // 就是等banner部分的宽高确定了之后再去请求歌单列表，有利于better-scroll计算高度

      silderflag:function(){
        if(this.silderflag){       
           this.getDiscLists()
        }
      }
    },
    methods:{
       selectItem(item){
         this.$router.push({
            // name:'disc',
            path:`/recommend/disc/${item.dissid}`,
            params:{
              id:item.id
            }
         })
         this.$store.dispatch('disc',item)
       },
       handlePlaylist(playlist){
          const bottom = playlist.length > 0 ? '60px' : 0
          this.$refs.recommend.style.bottom =  bottom

          // 重新调用scroll组件的refresh()方法
          this.$refs.scroll.refresh()
      },
      _getRecommend:function(){
        getRecommend().then((res) => {
            if(res.code == ERR_OK){
               console.log(res.data.slider)
               this.recommends=res.data.slider;
               this.silderflag=true
            }
        })
      },
      getDiscLists(){
          getDiscList2()
                .then((data) => {
                    console.log("imgcccc");
                    console.log(data)
                    if(data.code == ERR_OK){
                      this.discList=data.data.list
                    }
          })
      },
      getmovielist(){

          var moviecanshu={
            start:0,
            count:20
          }

          getMovie(moviecanshu)
                .then((data) => {
                    console.log("moviecanshu");
                    console.log(data)
          }); 
      },
      loadImage(){

        // checkLoaded 为 标志位，让 loadImage 里面的代码只执行一次，只执行一次 better-scroll组件的refresh()方法即可。

        if(!this.checkLoaded){

          console.log('loadImage')
          this.checkLoaded=true;

        }
      }
    },
    created:function(){
      this._getRecommend()
      // this._getRecommend()
      this.getmovielist()
    },
    mounted(){
        console.log(this.$refs.scroll.probeType)
    }
  }

</script>
<style scoped lang="scss" >
  .recommend{
    position: fixed;
    width:100%;
    top: 88px;
    bottom: 0;
    .recommend-content{
      height: 100%;
      overflow: hidden;
    }  
    .slider-wrapper{
        position: relative;
        width: 100%;
        overflow: hidden;
    }    
    .recommend-list{
        .list-title{
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-theme;
        }
        .item{
          display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0 20px 20px 20px;
          .icon{
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
           }
          .text{
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: $font-size-medium;
            .name{
                margin-bottom: 10px;
                color: $color-text;
            }  
            .desc{
                color: $color-text-d
            }
          }
        }
      .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      } 
    }
  }      
</style>