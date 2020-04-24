<!-- <template>
    <div class="img-scroll">
        <ul class="clearfix" >
            <li v-for="item in imgs">
                <a><img :src=item.img></a>
            </li>
        </ul>
        <div class="img-nav">

        </div>
    </div>
</template> -->

<template>
    <div class="img-scroll">
        <ul class="clearfix" >
            <!-- 如果你后续需要找到当前实例化后的swiper对象以对其进行一些操作的话，可以自定义配置一个ref属性 -->
            <swiper :options="swiperOption" ref="mySwiperA">
              <swiper-slide v-for="item in imgs">
                    <a><img :src=item.img></a>
              </swiper-slide>
              <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </ul>
        <div class="img-nav">

        </div>
    </div>
</template>



<script>
    import "../css/imgScroll.scss"
    import { mapGetters} from 'vuex'
    export default{
      data(){
        return{
            swiperOption: {
                // 所有配置均为可选（同Swiper配置）
                // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
                // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象（假如你需要使用获取swiper对象来做什么事，那么这个属性一定要是true）
                notNextTick: true,
                loop: true,
                autoplay: 3000,
                grabCursor : true,
                setWrapperSize :true,
                autoHeight: true,
                pagination : '.swiper-pagination',
                paginationClickable :true,
                mousewheelControl : true,
                observeParents:true,
                // if you need use plugins in the swiper, you can config in here like this
                // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
                debugger: true,
                // swiper callbacks
                // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
                onTransitionStart(swiper){
                }
                // more Swiper config ...
                // ...
            }
        }
      },
      computed:{
        ...mapGetters(['imgs'])
      }
    }
     
</script>
<style>
    .img-scroll img{
        width:100%;
        height:8rem;
    }
</style>