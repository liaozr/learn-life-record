<template>
    <div id='app'>
        <mu-appbar>
              <mu-icon-button icon="menu" slot="left"/>
              <mu-flat-button label="expand_more" slot="right"/>
        </mu-appbar>
        <h1>
           Hello <span>Vue.js</span>
        </h1>
        <div class="msg">
           {{msg}}
        </div>
        <child></child>
        <img :src="tupian" alt="">
        <br>
        <img :src="logo" alt="">
        <br>
        <div class="border">
            <transition name='fade'>
                  <keep-alive>
                     <router-view active-class></router-view>
                   </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script type="text/javascript">

    import child from './components/child'
    import tupian from './assets/images/aaa.png'

    // 用 import 的方式 引入 本地 的css 文件
    import index from './assets/css/index'

    export default {
      data() {
        return{
          msg:'我是廖仲仁',
          logo:require('./assets/images/ccc.png'),
          tupian
        }
      },
      components:{
           child
      }
    }

</script>

<style>

    h1 {
        font-family: 'Helvetica Neue';
        color: #2c3e50;
        text-align: center;
        margin-top: 30vh;
    }
    span {
        color: #42b983;
    }
    .border{
      border-top:1px solid green;
    }
    .active{
      color:green;
    }


/*----------------------------------------------------------------------------------*/
    /*路由 transition 过渡的效果*/

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
    /*一个结束后的状态*/
    .fade-enter,
    .fade-leave {
        opacity: 0;
    }
    
/*----------------------------------------------------------------------------------*/

</style>
