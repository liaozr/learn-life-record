<template>
  <div class="music-list">
      <div class="back" @click='back'>
          <i class="icon-back"></i>
      </div>
      <h1 class="title" v-text='title'></h1>
      <div class="bg-image" :style="bgStyle" ref='bgImage'>
          <div class="play-wrapper">
             <div class='play' v-if='songs.length >0' ref='playBtn' @click="randomPlay" >
                <i class="icon-play"></i>
                <span class='text'>随机播放全部</span>
             </div>
          </div>
          <div class="filter" ref='filter'></div>
      </div>
      <div class="bg-layer" ref='layer'></div>
      <scroll @scrollpos="scrollpos"  :probe-type='probeType' :listen-scroll="listenScroll" :lists="songs" class='list' ref='scroll'>
         <div class="song-list-wrapper">
            <songList @select="selectItem" :songs="songs" :rank='rank'></songList>
         </div>

        <div class="loading-container" v-show='!songs.length'>
              <loading></loading>
        </div>

      </scroll>  
  </div>
</template>

 <script type="text/ecmascript-6">
    
    import iconfint2 from 'assets/css/iconfont2.css'

    import scroll from '@c/scroll/scroll'

    import songList from '@c/songList/songList'

    import loading from '@c/loading/loading'

    const  RESERVED_HEIGHT = 40

    import { mapActions } from 'vuex'

    import { playlistMixin } from 'assets/js/mixin'

    export default{
        mixins:[playlistMixin],
        props:{
           bgImage:{
               type:String,
               default:''
           },
           songs:{
               type:Array,
               default:[]
           },
           title:{
               type:String,
               default:''
           },
           rank:{
             type:Boolean,
             default:false
           } 
        },
        data(){
          return{
            scrollY:0
          }
        },
        components:{
           scroll,
           songList,
           loading
        },
        methods:{
          handlePlaylist(playlist){
            const bottom = playlist.length > 0 ? '60px' : 0
            this.$refs.scroll.$el.style.bottom =  bottom

            // 重新调用scroll组件的refresh()方法
            this.$refs.scroll.refresh()
          },
          scrollpos(pos){
            console.log('eeeeeeeeeeee')
            this.scrollY=pos.y
          },
          back(){
            this.$router.back()
          },
          selectItem(item,index){
            console.log('hhhh')

            // 经测试这种情况，方法来调用 vuex里面的 mapActions 的方法的时候，
            // 是不能够传多个参数的，有多个参数的话，可以把多个参数转化成对象传过去即可。
            // this.selectPlay(this.songs,index) // 这种情况下，是传不了多个参数的
            this.selectPlay({
              list:this.songs,
              index
            })
          },
          randomPlay(){
            this.$store.dispatch('randomPlay',this.songs)
          },
          ...mapActions(['selectPlay'])
        },
        watch:{
          scrollY(newY){
             let translateY = Math.max(this.minTranslateY,newY)
             let zIndex = 0

             let scale = 1 // 设置 图片的 放大缩小

             let blur = 0

             this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`
             this.$refs.layer.style['webkitTransform'] = `translate3d(0,${translateY}px,0)`

             const percent =Math.abs( newY/ this.imageHeight)

             if(newY > 0){
               scale = 1 + percent
               zIndex = 10
             }else{
               blur=Math.min(20 * percent,20)           
             }

             //  设置高斯模糊
             this.$refs.filter.style['backdrop-filter']= `blur(${blur}px)`
             this.$refs.filter.style['webkitBackdrop-filter']= `blur(${blur}px)`

             if( newY < this.minTranslateY ){
               zIndex = 10
               this.$refs.bgImage.style.paddingTop =0
               this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`         

               this.$refs.playBtn.style.display = 'none'

             }else{
               this.$refs.bgImage.style.paddingTop = '70%'
               this.$refs.bgImage.style.height = 0

               this.$refs.playBtn.style.display = ''
             }

             this.$refs.bgImage.style.zIndex=zIndex
             this.$refs.bgImage.style['transform'] = `scale(${scale})`
             this.$refs.bgImage.style['webkitTransform'] = `scale(${scale})`
          }
        },
        computed:{
            bgStyle(){
                return `background-image:url(${this.bgImage})`
            }
        },
        created(){
          this.probeType = 3
          this.listenScroll = true
        },
        mounted(){

          this.imageHeight = this.$refs.bgImage.clientHeight
          this.minTranslateY= - this.imageHeight + RESERVED_HEIGHT
          // 控制songlist组件的top值
          this.$refs.scroll.$el.style.top=`${this.$refs.bgImage.clientHeight}px`
        }
    }
</script>

<style scoped lang="scss">

  .music-list{
    position:fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
    .back{
      position:absolute;
      top: 0;
      left: 6px;
      z-index: 50;
      .icon-back{
        display: block;
        padding: 10px;
        font-size: $font-size-large-x;
        color: $color-theme;
      } 
    } 
    .title{
      position: absolute;
      top: 0;
      left: 10%;
      z-index: 40;
      width: 80%;
      @include text-overflow(1,0);
      text-align: center;
      line-height: 40px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .bg-image{
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 70%;
      transform-origin: top;
      background-size: cover;
      .play-wrapper{
        position: absolute;
        bottom: 20px;
        z-index: 50;
        width: 100%;
        .play{
          box-sizing: border-box;
          width: 135px;
          padding: 7px 0;
          margin: 0 auto;
          text-align: center;
          border: 1px solid $color-theme;
          color: $color-theme;
          border-radius: 100px;
          font-size: 0;
          .icon-play{
            display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
            font-size: $font-size-medium-x;
          } 
          .text{
            display: inline-block;
            vertical-align: middle;
            font-size: $font-size-small;
          }
        }
      }  
      .filter{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
    }
    .bg-layer{
      position: relative;
      height: 100%;
      background: $color-background;
    }
    .list{
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: $color-background;
      .song-list-wrapper{
        padding: 20px 30px;
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