// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'       //引入vue模块
import App from './App'    //引入vue组件 

import 'babel-polyfill'

require("es6-promise").polyfill(); // axios,IE 整个家族都不支持 promise

import fastclick from 'fastclick'
fastclick.attach(document.body)

// 在调试阶段引入 vconsole
// import vConsole from 'vconsole'
// console.log('text')

// 导入vue的延迟加载组件
import VueLazyLoad from 'vue-lazyload'
// 告诉vue使用这个插件，并配置一些参数信息
// 懒加载的默认图片的导入
import defaultphoto from 'assets/images/default.png'
Vue.use(VueLazyLoad,{
  loading:defaultphoto
})

import router from './router'  // 导入路由配置文件

// 使用 vuex 单向数据流
import store from './vuex/store'

// -----------------------------------------------------------------------------------

//  使用 axios 请求数据
import axios from 'axios'
Vue.prototype.$http=axios
// Vue.use(axios)

// -----------------------------------------------------------------------------------

// 把 mock 模拟的数据导出 ,在项目中全局使用
import mock from './mock/mock'

// 全局 Vue filter
import * as filters from './filters'; 

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

Vue.config.productionTip = false

// --------------------------------------------------------------------------------------------------------------------

/* eslint-disable no-new */

new Vue({
  el: '#app',
  // 导入路由 router 跟 store 到项目里
  router,
  store,
  template: '<App/>',
  components: { App }
})
