<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click='hide' >
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
         <searchBox ref='searchBox' @query='onQueryChange' placeholader='搜索歌曲'></searchBox>
      </div>
      <div class="shortcut" v-show='!query'>
         <switches :switches="switches" :currentIndex="currentIndex" @switchesItem='switchesItem'></switches>
         <div class="list-wrapper">
            <scroll ref='songListScroll' class='list-scroll'  v-if='currentIndex == 0' :lists="get_playHistory">
               <div class="list-inner">
                   <songList @select='selectSong' :songs='get_playHistory'></songList>
               </div>
            </scroll>
            <scroll :refreshDelay="refreshDelay" ref='searchListScroll' class='list-scroll'  v-if='currentIndex == 1' :lists="getHistory">
               <div class="list-inner">
                   <searchList @deleteOne="deleteOne" @select='addQuery' :searches="getHistory"></searchList> 
               </div>
            </scroll>
         </div>
      </div>
      <div class="search-result" v-show='query'>
         <suggest @listScroll="blurInput" :query='query' :showSinger='showSinger' @select='selectSuggest'></suggest>
      </div>
       <topTips ref='topTips'>
          <div class="tip-title">
               <i class="icon-ok"></i>
               <span class="text">1首歌曲已经添加到播放队列</span>  
          </div>
       </topTips>  
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
     import searchBox from '@c/searchBox/searchBox'
     import suggest from '@v/search/suggest'
     import { searchMixin } from 'assets/js/mixin'
     import switches from '@c/switches/switches'
     import scroll from '@c/scroll/scroll'
     import {mapGetters} from 'vuex'
     import songList from "@c/songList/songList"
     import Song from 'assets/js/song'
     import searchList from '@c/searchList/searchList'
     import topTips from "@c/topTips/topTips"

     export default{
         mixins:[searchMixin],
         data(){
             return{
                 showFlag:false,
                 //  query:'',
                 showSinger:false,
                 switches:[
                   {
                     name:'最近播放'
                   },
                   {
                     name:'搜索历史'
                   }
                 ],
                 currentIndex:0,
                 refreshDelay:100
             }
         },
         components:{
           searchBox,
           suggest,
           switches,
           scroll,
           songList,
           searchList,
           topTips
         },
         methods:{
             show(){
                 this.showFlag = true
                 setTimeout(() =>{
                    if(this.currentIndex == 0){
                       this.$refs.songListScroll.refresh()
                    }else{
                       this.$refs.searchListScroll.refresh()
                    }
                 },20)              
             },
             hide(){
                 this.showFlag = false
             },
             selectSuggest(item){
                this.saveSearch()
                this.showTip()
             },
             switchesItem(index){
                this.currentIndex = index
             },
             selectSong(item,index){
                if(index !== 0){
                   this.$store.dispatch('insertSong',new Song(item))
                   this.showTip()
                }
             },
             showTip(){
               this.$refs.topTips.show()
             }
         },
         computed:{
           ...mapGetters(['get_playHistory'])
         }
     }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"
  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>