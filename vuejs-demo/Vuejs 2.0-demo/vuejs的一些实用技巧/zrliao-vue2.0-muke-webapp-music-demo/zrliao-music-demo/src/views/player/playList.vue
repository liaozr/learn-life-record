<template>
   <transition name="list-fade">
    <div class="playlist" v-show='showFlag' @click='hide'>
      <div class="list-wrapper" @click.stop>

        <div class="list-header">
          <h1 class="title">
            <i  @click='changeMode' class="icon" :class='iconMode' ></i>
            <span class="text">{{modeText}}</span>
            <span @click='clear' class="clear"><i class="icon-clear"></i></span>
          </h1>
        </div>

        <scroll :refreshDelay="refreshDelay" ref='scroll' class="list-content" :lists='sequencelist'>
            <transition-group name='list' tag='ul' >
                <li ref='listItem'  class="item" @click='selectItem(item,index)' v-for="(item,index) in sequencelist" :key='item.id' >
                    <i class="current" :class='getCurrentIcon(item)'></i>
                    <span class="text">{{item.name}}</span>
                    <span @click.stop="toggleFavorite(item)" class="like">
                        <i :class="getFavoriteIcon(item)"></i>
                    </span>
                    <span class="delete" @click.stop='deleteOne(item)' >
                        <i class="icon-delete"></i>
                    </span>
                </li>
            </transition-group>
        </scroll>
         
        <div class="list-operate">
          <div class="add" @click='addSong' >
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>

        <div class="list-close" @click='hide'>
          <span>关闭</span>
        </div>
        <confirm ref='confirm' @confirm='confirm' text='是否清空播放列表' confirmBtnText='清空'></confirm>
      </div>
       <addSong ref="addSong"></addSong>

    </div>
  </transition>
</template>

 <script type="text/ecmascript-6">

   import{mapGetters} from 'vuex'
   import scroll from '@c/scroll/scroll'
   import { playMode } from 'assets/js/config'
   import confirm from '@c/confirm/confirm'
   import addSong from './addSong'
   import { shuffle } from 'assets/js/util'
   import {playlistMixin} from 'assets/js/mixin'

   export default{
       mixins:[playlistMixin],
       data(){
           return{
               showFlag:false,
               refreshDelay:100
           }
       },
       components:{
           scroll,
           confirm,
           addSong
       },
       methods:{
           handlePlaylist(){
           },
           show(){
               this.showFlag = true
               // 显示隐藏的 也要调用 scroll组件的 refresh 方法    
               setTimeout(() =>{
                  this.$refs.scroll.refresh()
                  this.scrollToCurrent(this.currentSong)
               },20)
           },
           hide(){
              this.showFlag = false
           },
           clear(){
              this.$refs.confirm.show()
           },
           addSong(){
              this.$refs.addSong.show()
           },
           confirm(){
              this.$store.dispatch('deleteSongList')
              this.hide()
              this.$refs.confirm.hide()
           },
           changeMode(){
              const mode = (this.mode + 1) % 3 
              // 改变播放模式的样式
              this.$store.dispatch("setplayMode",mode)
              let list = null 
              if( mode == playMode.random){
                 list = shuffle ( this.sequencelist)
              }else{
                list = this.sequencelist
              }
              this.resetCurrentIndex(list)
              this.$store.dispatch('setPlayList',list)
           },      
           resetCurrentIndex(list){
              let index = list.findIndex( (item) =>{
                   return item.id ==  this.currentSong.id
              })
              this.$store.dispatch("setCurrentIndex",index)
           },
           getCurrentIcon(item){
              if(this.currentSong.id == item.id){
                  return 'icon-play'
              }else{
                  return ''
              }               
           },
           selectItem(item,index){
              if(this.mode == playMode.random){
                  index = this.playlist.findIndex((song) =>{
                      return song.id == item.id
                  })
              }
              this.$store.dispatch('setCurrentIndex',index) 
              this.$store.dispatch('setplaystate',true)                          
           },
           scrollToCurrent(current){
               const index = this.sequencelist.findIndex((song) =>{
                   return current.id == song.id
               })
               this.$refs.scroll.scrollToElement(this.$refs.listItem[index],300)
           },
           deleteOne(item){
               this.$store.dispatch('deleteSong',item)
               if(!this.playlist.length){
                   this.hide()
               }
           }
       },
       watch:{
           currentSong(newSong,oldSong){
              if(!this.showFlag || newSong == oldSong){
                 return
              }
              this.scrollToCurrent(newSong)
           }
       },
       computed:{
           ...mapGetters(['sequencelist','currentSong','playlist','mode']),
           iconMode(){
               return this.mode == playMode.sequence ? 'icon-sequence' : this.mode == playMode.loop ? "icon-loop" : 'icon-random'
           }, 
           modeText(){
               return this.mode == playMode.sequence ? '顺序播放' : this.mode == playMode.loop ? "单曲循环" : '随机播放'
           }         
       }
   }
</script>
 
<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"
  
  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>