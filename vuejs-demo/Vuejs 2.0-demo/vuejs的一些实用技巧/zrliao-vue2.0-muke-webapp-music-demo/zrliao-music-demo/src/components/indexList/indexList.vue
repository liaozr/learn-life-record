<template>
   <scroll ref='scroll' @scrollpos='scrollpos' class='listview' :probeType='probeType' :lists='lists' :listenScroll='listenScroll'>
      <ul>
          <li ref='listgroup' class='list-group' v-for='group in lists' :key='group.id'>
              <h2 class='list-group-title'>{{group.title}}</h2>
              <ul>
                  <li @click='selectItem(item)' v-for='item in group.items' :key='item.id' class='list-group-item' >
                       <img class='avatar' v-lazy="item.avatar" alt="">
                       <span class='name'>{{item.name}}</span>
                  </li>
              </ul>
          </li>
      </ul>
      <div class="list-shortcut" @touchstart.stop.prevent='onShortcutTouchStart($event)'  @touchmove.stop.prevent='onShortcutTouchMove($event)'>
          <ul>
              <li v-for='(item,index) in shortcutList' :data-index='index' :key='item.id' class='item' :class="{'current' :currentIndex == index}">
                  {{item}} 
              </li>
          </ul>
      </div>
      <div ref='fixedtitle' class="list-fixed" v-if='fixedTitle'>
          <h1 class="fixed-title">{{fixedTitle}}</h1>
      </div>
      <div v-show='!lists.length' class='loading-container'>
          <loading></loading>
      </div>      
   </scroll>

</template>

<script>

    import scroll from '../scroll/scroll'
    import loading from '@c/loading/loading'

    import { getData } from 'assets/js/dom'

    const ANCHOR_HEIGHT=18
    const TITLE_HEIGHT=30

    export default{
        data(){
            return{
                scrollY:-1,
                listenScroll:true,
                currentIndex:0,
                diff:-1
            }
        },
        props:{
            lists:{
                type:Array,
                default:[]
            }
        },
        components:{
            scroll,
            loading
        },
        methods:{
            selectItem(item){
               this.$emit('select',item)
            },
            onShortcutTouchStart(e){
               let anchorIndex=getData(e.target,'index')

               // this.$refs.scroll.scrollToElement(this.$refs.listgroup[anchorIndex],0)
               
               let firstTouch=e.touches[0]

               this.touch.anchorIndex=anchorIndex
               this.touch.y1=firstTouch.pageY // 拿到第一个 触摸点的 pageY 位置

               this.scrollTo(anchorIndex)
            },
            onShortcutTouchMove(e){
                let endTouch=e.touches[0]
                this.touch.y2=endTouch.pageY
                let delta=this.touch.y2 - this.touch.y1 // move点 跟 touchstart点  Y轴上的偏移
                let deltanum= ( delta / ANCHOR_HEIGHT ) || 0 // 偏移了几个锚点

                let anchorIndex= parseInt( this.touch.anchorIndex ) + deltanum

                this.scrollTo(anchorIndex)
            },
            refresh(){
              this.$refs.scroll.refresh()
            },
            scrollTo(index){
                if( !index && index !== 0 ){
                    return
                }
                if(index < 0){
                    index =0
                }else if(index > this.listHeight.length -2){
                    index = this.listHeight.length - 2  
                }
                this.scrollY = - this.listHeight[index] // 改变 scrollY,从而改变 scrollY 的值，跟着 从而 改变 currentIndex 的 值
                this.$refs.scroll.scrollToElement(this.$refs.listgroup[index],0)
            },
            scrollpos(pos){
              this.scrollY = pos.y // 实时获取 better-scroll y轴上滚动的距离。
              console.log(this.scrollY)
            },
            calculateHeight(){
               this.listHeight=[]
               const list=this.$refs.listgroup
               let height =0;
               this.listHeight.push(height)
               for(let i=0;i<list.length;i++){
                   let item = list[i]
                   height += item.clientHeight
                   this.listHeight.push(height)
               }
            } 
        },
        watch:{
          lists(){
              setTimeout(() =>{
                this.calculateHeight()      
              },20)
          },
          scrollY(newY){
            const listHeight =this.listHeight

            // 当滚动到顶部 ，newY > 0 的时候
            if( newY > 0 ){
                this.currentIndex =0;
                return
            }

            //  在中间部分滚动
            for(let i =0;i<listHeight.length ;i++){
                let height1=listHeight[i]
                let height2=listHeight[i + 1]
                if( -newY >= height1 && -newY <height2  ){
                   this.currentIndex = i
                   console.log(this.currentIndex)

                   this.diff=height2 + newY

                   return
                } 
            }

            // 当滚动到底部，且 -newY 大于 最后一个元素的上限

            this.currentIndex= listHeight.length - 2  

          },
          diff(newVal){
            let fixedTop = ( newVal > 0 && newVal < TITLE_HEIGHT ) ? newVal-TITLE_HEIGHT : 0
            
            // 减少对 dom 操作 的频度，以至于不用每次去修改 transform dom操作。
            if(this.fixedTop == fixedTop){
                return
            }
            this.fixedTop=fixedTop

            this.$refs.fixedtitle.style.transform= `translate3d(0,${fixedTop}px,0)`
          }
        },
        created(){
           this.touch={

           }
           this.listHeight=[]

           this.probeType=3
        },
        computed:{
            shortcutList(){
                return this.lists.map((group) =>{
                    return group.title.substr(0,1)
                })
            },
            fixedTitle(){
                if(this.scrollY > 0){
                   return 
                }
                return this.lists[this.currentIndex] ? this.lists[this.currentIndex].title : ''
            }
        }
    }

</script>

<style scoped lang='scss'>
.listview{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;
    .list-group{
      padding-bottom: 30px;
      .list-group-title{
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-highlight-background;
      } 
      .list-group-item{
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;
        .avatar{
          width: 50px;
          height: 50px;
          border-radius: 50%;
        } 
        .name{
          margin-left: 20px;
          color: $color-text-l;
          font-size: $font-size-medium;
        }
      } 
    }    
    .list-shortcut{
      position: absolute;
      z-index: 30;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 20px 0;
      border-radius: 10px;
      text-align: center;
      background: $color-background-d;
      font-family: Helvetica;
      .item{
        padding: 3px;
        line-height: 1;
        color: $color-text-l;
        font-size: $font-size-small;
        &.current{
          color: $color-theme;
        }
      }
    }
    .list-fixed{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .fixed-title{
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-highlight-background;
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

