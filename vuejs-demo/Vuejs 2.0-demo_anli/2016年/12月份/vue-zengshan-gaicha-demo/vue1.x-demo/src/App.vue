<template>
    <div id="app" class='app'>
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

import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"
import  './assets/index.css'

import 'jqueryui/jquery-ui.js'

import 'move-js/index.js'

import "iswiper/dist/swiper.css"
import "components-bootstrap/css/bootstrap.min.css"
import "components-font-awesome/css/font-awesome.min.css"
import 'normalize.css/normalize.css'

import store from './vuex/store'
  export default{
      data () {
        return{
         }
      },
      store
  }

</script>

<!-- 定义App.vue也很简单，创建一个Vue实例，
把vuex的store注入到根实例即可，这样组件内的所有子组件都能访问到store： -->
 
<!-- 


