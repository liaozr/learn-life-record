<template>
  <transition name="slide">
     <div class="user-center">
         <div class="back" @click='back'>
             <i class="icon-back"></i>
         </div>
         <div class="switches-wrapper">
             <switches @switchesItem='switchItem' :switches="switches" :currentIndex="currentIndex" ></switches>   
         </div>
         <div ref='playBtn' class="play-btn" @click='random'>
             <i class="icon-play"></i>
             <span class="text">随机播放全部</span>
         </div>
         <div class="list-wrapper" ref='listWrapper'>
            <scroll ref='favoriteList' class='list-scroll'  v-if='currentIndex == 0' :lists="favoriteList">
               <div class="list-inner">
                   <songList @select='selectSong' :songs='favoriteList'></songList>
               </div>
            </scroll>
            <scroll ref='playList' class='list-scroll'  v-if='currentIndex == 1' :lists="get_playHistory">
               <div class="list-inner">
                   <songList @select='selectSong' :songs='get_playHistory'></songList>
               </div>
            </scroll>
         </div>
         <div class="no-result-wrapper" v-show='noresult'>
             <noResult :title='noResultTitle'></noResult>
         </div>
     </div>
  </transition>
</template>

 <script type="text/ecmascript-6">
    import switches from '@c/switches/switches'
    import scroll from '@c/scroll/scroll'
    import {mapGetters} from 'vuex'
    import songList from '@c/songList/songList'
    import Song from 'assets/js/song'
    import {playlistMixin} from 'assets/js/mixin'
    import noResult from '@c/noResult/noResult'

    export default {
        mixins:[playlistMixin],
        data(){
            return{
               currentIndex:0,
               switches:[
                   {name:'我喜欢的'},
                   {name:'最近听的'}
               ]  
            }
        },
        components:{
            switches,
            scroll,
            songList,
            noResult
        },
        methods:{
            handlePlaylist(playlist){
              const bottom = playlist.length > 0 ? '60px' : ''
              this.$refs.listWrapper.style.bottom = bottom
              if(this.currentIndex == 0){
                this.$refs.favoriteList.refresh()
              }else{
                this.$refs.playList.refresh()
              }
            },
            switchItem(index){
                this.currentIndex = index
            },
            selectSong(song){
              // new Song(song) 为实例化一个song,将它转换成 song 的实例
              this.$store.dispatch('insertSong',new Song(song))
            },
            back(){
                this.$router.back()
            },
            random(){
                // 根据当前索引来判断 播放列表的歌曲           
                let list = this.currentIndex == 0 ? this.favoriteList : this.get_playHistory 
                
                if(list.length == 0){
                    return
                }
                              
                // 也是遍历list这个数组，然后实例化song这个类
                list = list.map((song)=>{
                    return new Song(song)
                })

                this.$store.dispatch("randomPlay",list)
            }
        },
        computed:{
            ...mapGetters(['favoriteList','get_playHistory']),
            noresult(){
                if(this.currentIndex == 0){
                    return !this.favoriteList.length
                }else{
                    return !this.get_playHistory.length
                }
            },
            noResultTitle(){
                if(this.currentIndex == 0){
                    return '暂无收藏歌曲'
                }else{
                    return '你还没有听过歌曲'
                }
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"

  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .switches-wrapper
      margin: 10px 0 30px 0
    .play-btn
      box-sizing: border-box
      width: 135px
      padding: 7px 0
      margin: 0 auto
      text-align: center
      border: 1px solid  $color-text-l
      color: $color-text-l
      border-radius: 100px
      font-size: 0
      .icon-play
        display: inline-block
        vertical-align: middle
        margin-right: 6px
        font-size: $font-size-medium-x
      .text
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small
    .list-wrapper
      position: absolute
      top: 110px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>