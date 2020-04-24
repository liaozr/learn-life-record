// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'babel-polyfill'
require("es6-promise").polyfill(); // axios,IE 整个家族都不支持 promise

import fastclick from 'fastclick'
fastclick.attach(document.body)


// 导入vue的延迟加载组件
import VueLazyLoad from 'vue-lazyload'
// 告诉vue使用这个插件，并配置一些参数信息
// 懒加载的默认图片的导入
import defaultphoto from 'assets/images/default.png'
Vue.use(VueLazyLoad,{
  loading:defaultphoto
})

//  使用 axios 请求数据
import axios from 'axios'
Vue.prototype.$http=axios


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
  router,
  components: { App },
  template: '<App/>'
})
