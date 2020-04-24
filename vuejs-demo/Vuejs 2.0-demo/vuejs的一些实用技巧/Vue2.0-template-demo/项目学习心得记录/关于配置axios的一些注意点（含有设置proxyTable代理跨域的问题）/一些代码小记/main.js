// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'       //引入vue模块
import App from './App'    //引入vue组件 

import router from './router'  // 导入路由配置文件

// 使用 vuex 单向数据流
import store from './vuex/store'

// 使用 Muse UI 组件
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)

//  使用 axios 请求数据
import axios from 'axios'
Vue.prototype.$http=axios
// Vue.use(axios)


// 全局 Vue filter
import * as filters from './filters'; 

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});


Vue.config.productionTip = false


/* eslint-disable no-new */

new Vue({
  el: '#app',
  // 导入路由 router 跟 store 到项目里
  router,
  store,
  template: '<App/>',
  components: { App }
})
