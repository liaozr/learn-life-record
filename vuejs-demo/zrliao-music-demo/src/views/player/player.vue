<template>
  <div class="player" v-show="playlist.length >0">
     <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave" >
        <div class="normal-player" v-show='fullScreen'>
              <div class="background">
                  <img width="100%" height="100%" :src="currentSong.image" alt="">
              </div>
              <div class="top">
                  <div class="back" @click="back">
                      <i class="icon-back"></i>
                  </div>
                  <h1 class="title" v-html="currentSong.name"></h1>
                  <h2 class="subtitle" v-html="currentSong.singer"></h2>
              </div>
              <div class="middle" 
                   @touchstart.prevent="middleTouchStart"
                   @touchmove.prevent='middleTouchMove'
                   @touchend="middleTouchEnd"
                   >
                  <div class="middle-l" ref='middleL'>
                      <div class="cd-wrapper" ref='cdWrapper'>
                          <div class="cd" :class="cdCls">
                              <img class="image" :src="currentSong.image" alt="">
                          </div>
                      </div>
                      <div class="playing-lyric-wrapper">
                         <div class="playing-lyric">
                           {{playingLyric}}
                         </div>
                      </div>
                  </div>
                  <scroll :lists="currentLyric && currentLyric.lines" class="middle-r" ref='lyricList'>
                    <div class="lyric-wrapper">
                       <div v-if='currentLyric'>
                            <p ref='lyricLine' class='text'
                            :class="{'current':currentLineNum == index }"
                             v-for='(line,index) in currentLyric.lines' :key='line.id'>
                               {{line.txt}}
                            </p>
                       </div>
                    </div>
                  </scroll>
              </div>       
              <div class="bottom">
                  <div class="dot-wrapper">
                    <span class="dot" :class="{'active':currentShow == 'cd'}"></span>
                    <span class="dot" :class="{'active':currentShow == 'lyric'}"></span>
                  </div>
                  <div class="progress-wrapper">
                     <span class="time time-l">{{format(currentTime)}}</span>
                     <div class="progress-bar-wrapper">
                       <progressBar @percentChange="percentChange" :percent="percent" ></progressBar>
                     </div>
                     <span class="time time-r">{{format(currentSong.duration)}}</span>      
                  </div>
                  <div class="operators">
                      <div class="icon i-left" @click='changeMode'>
                          <i :class="iconMode"></i>
                      </div>
                      <div class="icon i-left"  :class="disableCls">
                          <i @click='prev' class="icon-prev"></i>
                      </div>
                      <div class="icon i-center"  :class="disableCls">
                          <i @click="togglePlaying" :class="playIcon"></i>
                      </div>
                      <div class="icon i-right"  :class="disableCls">
                          <i @click='next' class="icon-next"></i>
                      </div>
                      <div class="icon i-right">
                          <i @click='toggleFavorite(currentSong)' class="icon" :class="getFavoriteIcon(currentSong)"></i>
                      </div>
                  </div>
              </div>          
        </div>
     </transition> 
     <transition name='mini'>
        <div class="mini-player" v-show="!fullScreen" @click='open'>
            <div class="icon">
                <img :class="cdCls" width="40" height="40" :src="currentSong.image"  alt="">
            </div>
            <div class="text">
                <h2 class="name" v-html="currentSong.name" ></h2>
                <p class="desc"  v-html="currentSong.singer"></p>
            </div>
            <div class="control">
                 <progressCircle :radius='radius' :percent="percent" >
                      <i @click.stop="togglePlaying" :class="miniIcon" class='icon-mini' ></i>     
                 </progressCircle> 
            </div>
            <div class="control" @click.stop='showPlayList' >
                <i class="icon-playlist"></i>
            </div>
        </div>
     </transition>

     <playList ref='playList'></playList> 

     <!-- audio标签的 onplay事件 跟 oncanplay事件 比较的话，onplay事件是当歌曲在开始播放的时候触发的，

      oncanplay事件是歌曲可以播放，准备就绪的时候可以触发的，

     在项目实践的时候，为了防止歌曲的快速切换引起的不正常的bug的产生，通常用 onplay事件 代替 oncanplay事件

     也就是说onplay事件好点。 -->

      <audio ref="audio" :src="currentSong.url" @play="readyplay" @error="errorplay" @timeupdate='updateTime' @ended="ended"></audio>
    
  </div>
</template>

 <script type="text/ecmascript-6">
     import animations from 'create-keyframe-animation'
     import { prefixStyle } from 'assets/js/dom'
     import progressBar from '@c/progressBar/progressBar'
     import progressCircle from '@c/progressCircle/progressCircle'

     import { playMode } from 'assets/js/config'
     import { shuffle } from 'assets/js/util'

     import scroll from '@c/scroll/scroll'

     import playList from './playList'

     import Lyric from 'lyric-parser'

     const transform = prefixStyle('transform')
     const transitionDuration = prefixStyle('transitionDuration')
     import { mapGetters,mapActions} from 'vuex'
     import {playlistMixin} from 'assets/js/mixin'

     export default{
         mixins:[playlistMixin],
         data(){
             return {
                songReady:false,
                currentTime:0,
                radius:32,
                currentLyric:null,
                currentLineNum:0,
                currentShow:'cd',
                playingLyric:''
             }
         },
         components:{
           progressBar,
           progressCircle,
           scroll,
           playList
         },
         methods:{
             handlePlaylist(){
             },
             showPlayList(){
               this.$refs.playList.show()
             },
             ...mapActions(['back','open','setplaystate']),
            //  一些 动画钩子函数的方法

            enter(el,done){

              const {x,y,scale} = this._getPosAndScale()

              let animation ={
                 0:{
                   transform:`translate3d(${x}px,${y}px,0) scale(${scale})`
                 },
                 60:{
                   transform:`translate3d(0,0,0) scale(1.1)`
                 },
                 100:{
                   transform:`translate3d(0,0,0) scale(1)`
                 }
              }

              animations.registerAnimation({
                name:'move',
                animation,
                presets:{
                  duration:400,
                  easing:'linear'
                }
              })

              animations.runAnimation(this.$refs.cdWrapper,'move',done)

            },
            // afterEnter 是enter 动画钩子函数的回调函数
            afterEnter(){
              animations.unregisterAnimation('move')
              this.$refs.cdWrapper.style.animation = ''
            },
            leave(el,done){
              this.$refs.cdWrapper.style.transition = 'all 0.4s'
              const { x,y,scale} = this._getPosAndScale()
              this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`

              this.$refs.cdWrapper.addEventListener("transitionend",done)
            },
            // leave的 done回调事件
            afterLeave(){
              this.$refs.cdWrapper.style.transition = ''
              this.$refs.cdWrapper.style[transform] = ''
            },
            _getPosAndScale(){
              const targetWidth = 40
              const paddingLeft = 40
              const paddingBottom = 30
              const paddingTop = 80
              const width = window.innerWidth * 0.8
              const scale = targetWidth / width
              const x= -(window.innerWidth / 2 -paddingLeft)
              const y= window.innerHeight - paddingTop -width / 2 - paddingBottom
              return {
                x,
                y,
                scale
              }

            },
            togglePlaying(){

               if(!this.songReady){
                 return
               }
               this.setplaystate(!this.playing)
               
              // 歌词的 暂停 以及开始  
               if(this.currentLyric){
                  this.currentLyric.togglePlay()
               }
            },
            next(){

              if(!this.songReady){
                return
              }

              // 处理边界情况，当播放列表只有一首歌时候的处理
              if(this.playlist.length == 1){
                  this.loop()
                  return
              }else{

                  let index = this.currentIndex + 1
                  if( index == this.playlist.length ){
                    index = 0
                  }
                  this.$store.dispatch('nextIndex', index )

                  if(!this.playing){
                    this.togglePlaying()
                  }
              }
              this.songReady=false
            },
            prev(){

              if(!this.songReady){
                 return
              }
               
              // 处理边界情况，当播放列表只有一首歌时候的处理
              if(this.playlist.length == 1){
                  this.loop()
                  return
              }else{
                  let index=this.currentIndex - 1  
                  if(index == -1){
                    index = this.playlist.length - 1
                  }
                  this.$store.dispatch('prevIndex',index)

                  if(!this.playing){
                      this.togglePlaying()
                  }
              }
              this.songReady=false
            },
            // 单曲循环的逻辑实现
            loop(){
               this.$refs.audio.currentTime = 0
               this.$refs.audio.play()

               if(this.currentLyric){
                 this.currentLyric.seek(0)
               }
            },
            readyplay(){
              this.songReady=true
              this.$store.dispatch("set_playHistory",this.currentSong)
            },
            errorplay(){
              this.songReady=true
            },
            ended(){
              if(this.mode == playMode.loop){
                this.loop()
              }else{
                this.next()
              }    
            },
            updateTime(e){
              this.currentTime = e.target.currentTime
            },
            format(interval){
              interval = interval | 0

              const minute = interval / 60 | 0
              const second = this._pad( interval % 60 )
              return `${minute}:${second}`
            },
            _pad(num,n = 2){
              let len = num.toString().length
              while (len < n){
                 num = '0' + num
                 len ++
              }
              return num
            },
            percentChange(percent){

               //  this.$refs.audio.currentTime 获取到的是当前 audio标签 当前播放的进度时间，它是一个可读写的属性，可以设置，也可以获取

              //  this.currentSong.duration * percent 即时 得到 拖动后，当前播放的时间在哪了。

              // 得到 this.$refs.audio.currentTime 后，即间接得到了，当前的percent 比例，

              // 而不是 单纯的这样 去改变 percent 比例 值 
              // this.percent = percent
               this.$refs.audio.currentTime = this.currentSong.duration * percent

               if(!this.playing){
                 this.togglePlaying()
               }
               
               // 获取 歌曲 当前 播放进度的 歌曲时间。  
               const currentTime = this.currentSong.duration * percent

               // 拖动播放进度条的时候，改变 歌曲歌词对应到相对应的位置. 
               if(this.currentLyric){
                   this.currentLyric.seek(currentTime * 1000)
               }
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
            // 当播放模式改变后，重新改变当前播放的currentIndex,实现的是播放模式改变后，当前播放的歌曲不变。         
            resetCurrentIndex(list){
              let index = list.findIndex( (item) =>{
                   return item.id ==  this.currentSong.id
              })
              this.$store.dispatch("setCurrentIndex",index)
            },
            getLyric(){

              this.currentSong.getLyric().then((lyric) =>{
                   //边界处理，当快速切换歌曲时候的一些边界处理
                 if(this.currentSong.lyric !== lyric){
                   return
                 }
                  // Lyric 是慕课网作者自己封装的 一个解析 歌词的一个类
                  // 所以，这个 this.currentLyric 就继承了 类 Lyric 这个类中的所有方法的了。
                 //  包括下面的 play方法。
                 this.currentLyric = new Lyric(lyric,this.handleLyric)

                 if(this.playing){
                    //  这个play方法是继承自 类 Lyric里面来的，
                   //  this.currentLyric 页面上并没有定义这个方法的。
                   this.currentLyric.play()
                 }
                 console.log(this.currentLyric)
              }).catch(() =>{
                  // 捕捉异常
                  this.currentLyric = null
                  this.playingLyric = ''
                  this.currentLineNum = 0
              })

            },
            //这个是类Lyric方法的回调函数
            handleLyric( {lineNum,txt} ){
               this.currentLineNum = lineNum
               // 大于 5行，让歌词 滚动  
               if(lineNum > 5){
                 let lineEl = this.$refs.lyricLine[lineNum - 5]
                 this.$refs.lyricList.scrollToElement(lineEl,1000)
               }else{
                 this.$refs.lyricList.scrollToElement(0,0,1000)
               }

               //获取当前播放的歌词并展示到页面上 
               this.playingLyric = txt
            },
            middleTouchStart(e){
               this.touch.initiated = true
               const touch = e.touches[0]
               this.touch.startX = touch.pageX  // 记录 touchstart事件的 pageX值
               this.touch.startY = touch.pageY  // 记录 touchstart事件的 pageY值
            },
            middleTouchMove(e){
               if(!this.touch.initiated){
                 return
               }
               const touch = e.touches[0]
               const deltaX = touch.pageX - this.touch.startX
               const deltaY = touch.pageY - this.touch.startY
              
               // 这种情况下 意味着  是纵向滚动，纵向滚动的话就什么都不做，直接return 回去  
               if( Math.abs(deltaY) > Math.abs(deltaX) ){
                  return 
               }
               const left  = this.currentShow == 'cd' ? 0 : -window.innerWidth
               const offsetWidth = Math.min(0,Math.max(-window.innerWidth,left + deltaX) )
               
               this.touch.percent = Math.abs( offsetWidth / window.innerWidth)
               this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`

               this.$refs.lyricList.$el.style[transitionDuration] =  0

               this.$refs.middleL.style.opacity = 1- this.touch.percent
               this.$refs.middleL.style[transitionDuration] =  0

            },
            // touchend 事件
            middleTouchEnd(){
              let offsetWidth 

              let opacity 

              // 当前的currentShow 为 cd 的时候

              if(this.currentShow == 'cd'){
                  // 滑动的比例值 超过 10%的话，就直接让他滑动过来，
                  // 并把当前的currentShow 设置 为lyric
                  if(this.touch.percent > 0.1){
                    offsetWidth = -window.innerWidth

                    opacity = 0
                    this.currentShow = 'lyric'
                  }else{
                    offsetWidth = 0

                    opacity = 1
                  }
              }else{
                if(this.touch.percent < 0.9){
                   offsetWidth = 0
                   this.currentShow = 'cd'

                   opacity = 1
                }else{
                  offsetWidth = -window.innerWidth

                  opacity = 0
                }
              }
              
              const time = 300
              this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`

              this.$refs.lyricList.$el.style[transitionDuration] =  `${time}ms`

              this.$refs.middleL.style.opacity = opacity
              this.$refs.middleL.style[transitionDuration] =  `${time}ms`
            }
         },
         watch:{
            currentSong(newSong,oldSong){
              // 等 audio dom 获取到 src 后 在执行 play方法，所以 得用  nextTick钩子
              if(!newSong.id){
                 return
              }

              if(newSong.id == oldSong.id){
                return
              }

              // 在歌曲发生改变之前，把之前已有的 this.currentLyric 清除掉
              if(this.currentLyric){
                this.currentLyric.stop()
              }
              
              // 延迟执行
              clearTimeout(this.timer)
              this.timer=setTimeout(()=>{
                this.$refs.audio.play()

                // getLyric 是 song类的公共方法来的
                // this.currentSong.getLyric()

                // 这个 this.getLyric() 只是调用 vue的 getLyric()的 这个方法。
                this.getLyric()
              },1000)

            },
            playing(newPlaying){
               const audio =this.$refs.audio
               
               // watch 这里 也同理 ，一样得把 nextTick钩子 加上去。
               this.$nextTick(() =>{
                  newPlaying ? audio.play() : audio.pause()
               })
            }    
         },
         computed:{
           playIcon(){
               return this.playing ? 'icon-pause' : 'icon-play'  
           },
           miniIcon(){
               return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
           },
           cdCls(){
               return this.playing ?  'play' :'play pause' 
           },
           iconMode(){
             return this.mode == playMode.sequence ? 'icon-sequence' : this.mode == playMode.loop ? "icon-loop" : 'icon-random'
           },
           disableCls(){
               return this.songReady ? '' :'disable'
           },
           percent(){
               return this.currentTime / this.currentSong.duration
           },
            ...mapGetters(['fullScreen','playlist','currentSong','playing','currentIndex','mode','sequencelist'])
         },
         created(){
           this.touch = {}
         }
     }
</script>

<style scoped lang="scss">
 
  .player{
    .normal-player{
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 150;
      background: $color-background;
      .background{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px);
      }
      .top{
        position: relative;
        margin-bottom: 25px;
        .back{
          position:absolute;
          top: 0;
          left: 6px;
          z-index: 50;
          .icon-back{
            display: block;
            padding: 9px;
            font-size: $font-size-large-x;
            color: $color-theme;
            transform: rotate(-90deg);
          }
        }
        .title{
          width: 70%;
          margin: 0 auto;
          line-height: 40px;
          text-align: center;
          //no-wrap()
          @include text-overflow();
          font-size: $font-size-large;
          color: $color-text;
        }
        .subtitle{
          line-height: 20px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-text;
        }
      }
      .middle{
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
        .middle-l{
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
          .cd-wrapper{
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;
            .cd{
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 10px solid rgba(255, 255, 255, 0.1);
              border-radius: 50%;
              &.play{
                animation: rotate 20s linear infinite
              }
              &.pause{
                animation-play-state: paused
              }  
              .image{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }
          .playing-lyric-wrapper{
            width: 80%;
            margin: 30px auto 0 auto;
            overflow: hidden;
            text-align: center;
            .playing-lyric{
              height: 20px;
              line-height: 20px;
              font-size: $font-size-medium;
              color: $color-text-l;
            }
          }
        }
        .middle-r{
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 100%;
          overflow: hidden;
          .lyric-wrapper{
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;
            .text{
              line-height: 32px;
              color: $color-text-l;
              font-size: $font-size-medium;
              &.current{
                color: $color-text;
              }
            }
          }
        }
      }
      .bottom{
        position: absolute;
        bottom: 50px;
        width: 100%;
        .dot-wrapper{
          text-align: center;
          font-size: 0;
          .dot{
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: $color-text-l;
            &.active{
              width: 20px;
              border-radius: 5px;
              background: $color-text-ll;
            }
          }
        }
        .progress-wrapper{
          display: flex;
          align-items: center;
          width: 80%;
          margin: 0px auto;
          padding: 10px 0;
          .time{
            color: $color-text;
            font-size: $font-size-small;
            flex: 0 0 30px;
            line-height: 30px;
            width: 30px;
            &.time-l{
              text-align: left;
            }
            &.time-r{
              text-align: right
            }
          }
          .progress-bar-wrapper{
            flex: 1
          }
        }
        .operators{
          display: flex;
          align-items: center;
          .icon{
            flex: 1;
            color: $color-theme;
            &.disable{
              color: $color-theme-d;
            }
            i{
              font-size: 30px
            }
          }
          .i-left{
            text-align: right
          }
          .i-center{
            padding: 0 20px;
            text-align: center;
            i{
              font-size: 40px;
            }
          }
          .i-right{
            text-align: left;
          }
          .icon-favorite{
            color: $color-sub-theme
          }
        }
      }
      &.normal-enter-active, &.normal-leave-active{
        transition: all 0.4s;
        .top, .bottom{
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        }
      }
      &.normal-enter, &.normal-leave-to{
        opacity: 0;
        .top{
          transform: translate3d(0, -100px, 0);
        }
        .bottom{
          transform: translate3d(0, 100px, 0)
        }
      }
    }
    .mini-player{
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 180;
      width: 100%;
      height: 60px;
      background: $color-highlight-background;
      &.mini-enter-active, &.mini-leave-active{
        transition: all 0.4s
      }
      &.mini-enter, &.mini-leave-to{
        opacity: 0
      }
      .icon{
        flex: 0 0 40px;
        width: 40px;
        padding: 0 10px 0 20px;
        img{
          border-radius: 50%;
          &.play{
            animation: rotate 10s linear infinite;
          }
          &.pause{
            animation-play-state: paused
          }
        }
      }
      .text{
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        .name{
          margin-bottom: 2px;
        //   no-wrap()
          @include text-overflow();
          font-size: $font-size-medium;
          color: $color-text;
        }
        .desc{
        //   no-wrap()
          @include text-overflow();
          font-size: $font-size-small;
          color: $color-text-d;
        }
      }
      .control{
        flex: 0 0 30px;
        width: 30px;
        padding: 0 10px;
        .icon-play-mini, .icon-pause-mini, .icon-playlist{
          font-size: 30px;
          color: $color-theme-d;
        }
        .icon-mini{
          font-size: 32px;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }
  @keyframes rotate{
    0%{
      transform: rotate(0)
    }100%{
      transform: rotate(360deg)
    }
  }
</style>