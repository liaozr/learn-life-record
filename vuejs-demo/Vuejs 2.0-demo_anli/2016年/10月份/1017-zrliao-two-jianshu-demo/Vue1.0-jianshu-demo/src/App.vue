<template>
    <div id="app" class='container'>
        <slide-left></slide-left>
        <div class="content home">
            <router-view transition = 'display' keep-alive transition-mode='out-in'></router-view>
        </div>   
        <slide-right></slide-right> 
    </div>
</template>

<style>
  html, #app {
    height: 100%;
  }
</style>

<script type="text/javascript">

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/index.css'
import 'font-awesome/css/font-awesome.min.css'

import store from './vuex/store'
import slideLeft from './components/slideLeft'
import slideRight from './components/slideRight'

  export default{
      data () {
        return{
         }
      },
      store,
      components:{
        slideLeft,
        slideRight
      }
  }

</script>

<!-- 定义App.vue也很简单，创建一个Vue实例，
把vuex的store注入到根实例即可，这样组件内的所有子组件都能访问到store： -->
 

<style>
  .display-transition{
     transition:0.5s all;
  }
  .display-enter{
     opacity: 1;
  }
  .display-leave{
    opacity: 0;
    transform: translateX(50px);
  }
</style>
