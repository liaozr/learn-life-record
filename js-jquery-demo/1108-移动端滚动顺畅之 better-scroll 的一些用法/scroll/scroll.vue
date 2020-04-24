<template>
 <div ref='wrapper'>
    <slot></slot>
 </div>
</template>

<script>


   // better-scroll 的初始化时机很重要，因为它在初始化的时候，会计算父元素和子元素的高度和宽度，来决定是否可以纵向和横向滚动。

   // 因此，我们在初始化它的时候，必须确保父元素和子元素的内容已经正确渲染了。

   // 如果子元素或者父元素 DOM 结构发生改变的时候，必须重新调用 scroll.refresh() 方法重新计算来确保滚动效果的正常。

   // 所以同学们反馈的 better-scroll 不能滚动的原因多半是初始化 better-scroll 的时机不对，

   // 或者是当 DOM 结构发送变化的时候并没有重新计算 better-scroll。

   import BScroll from 'better-scroll'
   export default{
       data(){
           return{

           }
       },
       props:{
           /** *
              1 滚动的时候会派发scroll事件，会节流 。 *
              2 滚动的时候实时派发scroll事件，不会节流 。 *
              3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
           */
           probeType:{
               type:Number,
               default:1 // 1 表示节流 监听  3表示 不节流 的监听
           },
           // 点击列表是否派发click事件
           click:{
               type:Boolean,
               default:true
           },
           /** * 是否开启横向滚动 */
           scrollX: {
               type: Boolean,
               default: false
           },
           // 列表的数据
           lists:{
               type:Array,
               default:[]
           },
           // 是否派发滚动事件
           listenScroll:{
               type:Boolean,
               default:false
           },
           // 是否开启上拉加载
           pullup:{
               type:Boolean,
               default:false
           },
           // 是否开启下拉刷新
           pulldown:{
               type:Boolean,
               default:false
           },
           // better-scroll在滚动前会派发一个beforeScrollStart事件的
           // 是否派发 列表滚动开始 的 事件
           beforeScroll:{
               type:Boolean,
               default:false
           },
           // 当数据更新后，刷新scroll的延迟

           // 这里之所以要有一个 refreshDelay 的设置是考虑到如果我们对列表操作用到了 transition-group 做动画效果，
           // 那么 DOM 的渲染完毕时间就是在动画完成之后。


           // 20 ms 是一个经验值，每一个 Tick 约为 17 ms），对用户体验而言都是无感知的。

           refreshDelay:{
                type:Number,
                default:20
           }
       },
       methods:{
           //  初始化 better-scroll 组件
           initScroll(){

               // 保证 dom 已经渲染完成了。
               if(!this.$refs.wrapper){
                  return
               }

               this.scroll=new BScroll(this.$refs.wrapper,{
                   probeType:this.probeType,
                   click:this.click
               })

               // 是否监听 scroll 组件的 滚动事件 ，返回的pos 是一个  x,y轴的滚动偏移位置
               if(this.listenScroll){
                   let _this= this;
                   this.scroll.on("scroll",(pos) =>{
                       _this.$emit('scrollpos',pos)
                   })
               }
               // 是否派发滚动到底部事件，用于上拉加载
               if(this.pullup){
                   this.scroll.on('scrollEnd',() =>{
                       // 滚动到底部
                       if(this.scroll.y <= (this.scroll.maxScrollY + 50)){
                           this.$emit('scrollToEnd')
                       }
                   })
               }
               // 是否派发顶部下拉事件，用于下拉刷新
               if (this.pulldown) {
                   this.scroll.on('touchend', (pos) => {
                       // 下拉动作
                       if (pos.y > 50) {
                            this.$emit('pulldown')
                       }
                   })
               }
               // 是否派发列表滚动开始的事件
               if(this.beforeScroll){
                   this.scroll.on('beforeScrollStart',() =>{
                       this.$emit('beforeScroll')
                   })
               }
           },
           // 代理 better-scroll的enable方法
           enable(){
               this.scroll && this.scroll.enable()
           },
           // 代理 better-scroll的disable方法
           disable(){
               this.scroll && this.scroll.disable()
           },
           // 代理 better-scroll的refresh方法
           refresh(){
               this.scroll && this.scroll.refresh()
           },
           // 代理 better-scroll的scrollTo方法
           scrollTo(){
             this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
           },
           // 代理better-scroll的 scrollToElement方法
           scrollToElement(){
             this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
           }
       },
       watch:{
         // 监听数据的变化，延时 refreshDelay 时间后 调用 refresh方法重新计算，保证滚动效果正常
         lists(){
            setTimeout(() =>{
               this.refresh()
            },this.refreshDelay)
         }
       },
       mounted(){
           // 保证在DOM 渲染完毕 后 再初始化 scroll 组件
           setTimeout(() =>{
               this.initScroll()
           },20)
       }
   }
</script>
