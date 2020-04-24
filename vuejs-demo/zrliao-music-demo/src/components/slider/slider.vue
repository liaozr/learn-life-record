<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots" v-if='dots.length'>
        <span class='dot' v-for='(item,index) in dots' :class="{'active':index == currentPageIndex}"></span>
    </div>
  </div>
</template>

 <script type="text/ecmascript-6">

  import BScroll from 'better-scroll'
  import { addClass } from 'assets/js/dom'

  export default {
    name: 'slider',
    props:{
      loop:{
          type:Boolean,
          default:true
      },
      autoplay:{
          type:Boolean,
          default:true
      },
      interval:{
          type:Number,
          default:4000
      }
    },
    data() {
        return{
          dots:[],
          currentPageIndex:0
        }     
    },
    mounted(){

      // 由于 在 recommend 组件 里 已经判断过  等有数据的时候，再去 渲染 slider组件，
      // 所以 这个mounted钩子  里面 肯定 能拿到  组件元素的一些属性的   

      // better-scroll 一般错误引起缘由：组件未渲染，或者组件的宽高度不对引起的
      // 在mounted 钩子 里面 等 dom  元素 ready的时候 在初始化  better-scroll这个组件

      setTimeout(() =>{

          this._setSliderWidth()
          this._initSlider()

          this.initDots()

          if(this.autoplay){
            this._play()  
          }
      },20)

     window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    methods:{
        // 设置 slider轮播 组件 的一些属性。
        _setSliderWidth(isResize){
            // children: VNode 子节点的数组
            this.children=this.$refs.sliderGroup.children;   // 因为 sliderGroup 是一个 dom 对象， 所以 它的 children 是它的子元素
            let width=0;
            let sliderWidth=this.$refs.slider.clientWidth;
            for(let i=0;i<this.children.length;i++){
                let child = this.children[i]
                addClass(child,'slider-item')
                child.style.width=sliderWidth +'px';
                width +=sliderWidth
            }
            if(this.loop && !isResize){
                width += 2 * sliderWidth
            }
            this.$refs.sliderGroup.style.width=width +'px'
        },
        // 初始化 slider轮播组件，包括初始化 better-scroll 组件
        _initSlider(){
            this.slider= new BScroll(this.$refs.slider,{
              scrollX:true,
              scroollY:false,
              momentum: false,
              snap: true,
              snapLoop: this.loop,
              snapThreshold: 0.3,
              snapSpeed: 400
            })

            var _this=this;
            this.slider.on('scrollEnd',function(){
                let PageIndex=_this.slider.getCurrentPage().pageX
                if(_this.loop){
                  PageIndex -= 1
                }
                _this.currentPageIndex=PageIndex

                if(_this.autoplay){
                    clearTimeout(_this.timeer)
                    _this._play()
                }
            })

        },
        _play(){
          let pageIndex=this.currentPageIndex + 1;
          if(this.loop){
              pageIndex +=1
          }
          this.timeer=setTimeout(() =>{
            this.slider.goToPage(pageIndex,0,400)
          },this.interval)
        },
        initDots(){
            this.dots = new Array(this.children.length)
            // this.dots.length=this.children.length;
            console.log(this.dots)
        }
    },
    // 组件被销毁的时候，记得清掉定时器，有利于内存的释放
    destroyed(){
        clearTimeout(this.timer)
    }
  }
</script>

<style scoped lang="scss" >
    .slider{
        min-height:1px;
        .slider-group{
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        .slider-item{
            float: left;
            box-sizing: border-box;
            overflow: hidden;
            text-align: center;
            a{
            display: block;
            width: 100%;
            overflow: hidden;
            text-decoration: none;
            }  
            img{
            display: block;
            width: 100%;
            }
        }  
        }   
        .dots{
        position: absolute;
        right: 0;
        left: 0;
        bottom: 12px;
        text-align: center;
        font-size: 0;
        .dot{
            display: inline-block;
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
    }          
</style>