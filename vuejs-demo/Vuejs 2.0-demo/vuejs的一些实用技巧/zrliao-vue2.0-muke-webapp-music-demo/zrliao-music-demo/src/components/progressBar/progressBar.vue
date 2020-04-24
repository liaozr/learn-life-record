<template>

  <div class="progress-bar" ref='progressBar' @click="progressClick">
      <div class="bar-inner">
          <div class="progress" ref='progress'></div>
          <div class="progress-btn-wrapper" ref="progressBtn"  
            @touchstart.prevent="progressTouchStart"
            @touchmove.prevent="progressTouchMove"
            @touchend.prevent="progressTouchEnd"
            >
              <div class="progress-btn"></div>
          </div>
      </div>   

  </div>

</template>

 <script type="text/ecmascript-6">

    import { prefixStyle }  from 'assets/js/dom'

    const transform =prefixStyle('transform')
 
     const  progressBtnWidth = 16 
     export default{
         data(){
             return {

             }
         },
         props:{
           percent:{
               type:Number,
               default:0
           } 
         },
         methods:{
             progressTouchStart(e){

                //  标志位
                this.touch.initiated = true

                //  touches[0] 表示的是第一个手指 
                //  pageX 表示的 是 触摸的 是 横坐标
                this.touch.startX = e.touches[0].pageX

                this.touch.left = this.$refs.progress.clientWidth
             },
             progressTouchMove(e){
                 // 标志位，表示如果没有进入到  progressTouchStart 这个事件里面的话，
                 //  就把他return掉
                 if(!this.touch.initiated){
                    return
                 }
                 
                  // 获取 touchmove 事件 触摸的  横坐标 值 并 减去 touchstart 获取到 的横坐标的值，
                 //  得到 由  touchstart 到 touchmove  整个事件活动的偏移量 值。
                 const deltaX = e.touches[0].pageX - this.touch.startX
                 
                 //  偏移量 是不能 超过 整个播放进度条的长度的，所以最外层加上个  Math.min 的作用就在这了。 
                 const offsetWidth = Math.min( this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0,this.touch.left + deltaX) )

                 this._offset(offsetWidth)

             },
             progressTouchEnd(){
                  // touchend 事件的时候，把 标志位  initiated 标志位 重置为  false 
                  this.touch.initiated = false

                  // 派发一个事件，告诉 我被拖动到哪个进度了。   
                  this._triggerPercent()
             },
             progressClick(e){
                // e.offsetX 得到的是当前点击播放进度条的当前偏移量
               // offsetX 设置或者是得到鼠标相对于目标事件的父元素的内边界在x坐标上的位置

               // 当我们这里点击  progressBtn的时候，e.offsetX 获取不对                   
               // 所以，不能直接使用 e.offsetX
               // this._offset(e.offsetX)

               // getBoundingClientRect 获取element实际的top、bottom、left、right定位值
               const rect = this.$refs.progressBar.getBoundingClientRect()

               // 偏移量  
               // pageX() 属性是鼠标指针的位置，相对于文档的左边缘。  
               const offsetWidth = e.pageX - rect.left
               this._offset(offsetWidth)
               this._triggerPercent()
             },
             _offset(offsetWidth){
                this.$refs.progress.style.width = `${offsetWidth}px`
                this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
             },
             _triggerPercent(){
                const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth

                //  拖动到最后的时候，改变 percent  这个值。
                const percent =  this.$refs.progress.clientWidth / barWidth
                
                // 派发一个percentChange事件，告诉父组件知道，percent 被改变了。
                this.$emit('percentChange',percent)
             }            
         },
         watch:{
             percent(newPercent){

                //  加多个 this.touch.initiated 的 作用是 拖动 进度条的时候,
                // 歌曲还在播放，所以 percent会实时的变化，导致 这个 进度条的偏移量 会跳来跳去的抖动效果
                // 解决办法就是，当拖动 进度条的时候，不通过percent 来改变 进度条的 偏移量即可

                if( newPercent >= 0 && !this.touch.initiated){
                    const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
                    const offsetWidth = newPercent * barWidth
                    this._offset(offsetWidth)
                   
                }
             }
         },
         created(){
             this.touch = {}
         }
     }
</script>

<style scoped lang="scss">
  .progress-bar{
    height: 30px;
    .bar-inner{
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      .progress{
        position: absolute;
        height: 100%;
        background: $color-theme;
      }
      .progress-btn-wrapper{
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn{
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid $color-text;
          border-radius: 50%;
          background: $color-theme;
        }
      }
    }
  }
</style>