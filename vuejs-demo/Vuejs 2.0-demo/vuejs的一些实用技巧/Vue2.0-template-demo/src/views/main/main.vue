<template>
  <div id="app">

    <transition name="fade">
          <router-view class="g-content"></router-view>
    </transition>

     <cFooter v-show="$route.meta.navShow" ></cFooter>  

  </div>	

</template>	

<script>

   import cFooter from '@c/footer/footer'

   export default {
      data(){
        return{

        }
      },
      components:{
        cFooter
      }
    }
	 
</script>

<style lang='scss' scoped>
	

   /*路由 transition 过渡的效果*/
    
    /*fade过渡效果*/
    /*——> 用于底部导航栏的菜单的切换*/

    /* 定义运动的时间 */
    /* xx-enter-active xx-leave-active 要定义一个过渡的时间 和过渡形式 */
    .fade-enter-active,
    .fade-leave-active {
        transition: 0.5s all ease;
    }

    /*当元素要显示出来的时候 ——> 要以什么样子显示  */
    .fade-enter-active {
        opacity: 1;
    }
    /* 当元素要消失的时候  ——> 要以什么样子消失 */
    .fade-leave-active {
        opacity: 0;
    }

    /*  初始的状态 */

    /*一个开始的状态*/
    .fade-enter{
       opacity: 0;
    }

    /*v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除*/
    .fade-leave {
        opacity:1;
    }

</style>