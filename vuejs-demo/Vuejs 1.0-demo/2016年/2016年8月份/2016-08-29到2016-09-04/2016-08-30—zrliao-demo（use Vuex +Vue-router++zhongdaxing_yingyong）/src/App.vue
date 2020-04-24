<template>
    <div id="app" class='app'>
         <navbar></navbar>
         <router-view></router-view>  
    </div>
</template>

<style>
  html, #app {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    border: 0;
    height: 100%;
    max-height: 100%;
    position: relative;
  }
@import './assets/zujian.css';
</style>


<script type="text/javascript">
import Navbar from './components/Navbar'
import store from './vuex/store'
  export default{
      data () {
        return{
         }
      },
      components:{
        Navbar
      },
      store
  }

</script>

<!-- 定义App.vue也很简单，创建一个Vue实例，
把vuex的store注入到根实例即可，这样组件内的所有子组件都能访问到store： -->
 
<!-- 

这里的nav是一个导航栏组件，包括“最近7天待还”和“全部待还”两个，
由于"全部待还”的展示和“最近7天待还”基本一样，demo里面就没有再做实现，
只提供一个占位方便展示router切换。

 -->
 

