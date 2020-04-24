<template>
     <div id="app" class='container'>
        <slide-left></slide-left>
        <div class="content home">
            <transition name='display'>
               <keep-alive>
                  <router-view></router-view>
                </keep-alive>
            </transition>
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

import slideLeft from './components/slideLeft'
import slideRight from './components/slideRight'

  export default{
      data () {
        return{
         }
      },
      components:{
        slideLeft,
        slideRight
      }
  }

</script>

<!-- 定义App.vue也很简单，创建一个Vue实例，
把vuex的store注入到根实例即可，这样组件内的所有子组件都能访问到store： -->

 <style>
  html, #app {
    height: 100%;
  }
</style>

<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.dropdown .active a:link{
  text-decoration: none;
}
.dropdown .active a:visited{
  text-decoration: none;
}
.dropdown .active a:hover{
  text-decoration: none;
}
.dropdown .active a:actived{
  text-decoration: none;
}
</style>

 
