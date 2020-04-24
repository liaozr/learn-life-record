 // The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'

import 'babel-polyfill'
require("es6-promise").polyfill(); // axios,IE 整个家族都不支持 promise

import axios from 'axios';
Vue.prototype.$http = axios

import http from '@a/http';
Vue.prototype.ajax = http.ajax;

// 全局 Vue filter
import * as filters from './filters';
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

// const BESE_URL = 'http://192.168.0.101:8020';
// Vue.prototype.BESE_URL = BESE_URL;
// Vue.filter('imgFilter', src => {
//  return BESE_URL + src;
// });

import { getBaseUrl } from '@u/public'

Vue.prototype.BESE_URL = getBaseUrl;

if(process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = getBaseUrl
}

Vue.filter('imgFilter', src => {
  return getBaseUrl + src;
});

import ElementUI from 'element-ui';
import '@/theme/index.css'
import Vuex from 'vuex';
import animate from 'animate.css';
import '@/assets/css/reset.css';
import '@/assets/css/globle.css';
import '@/assets/css/font.css';


import store from '@/store/store.js'

// if(process.env.NODE_ENV === 'production') {
//  axios.defaults.baseURL = Api.BASE_URL;
// }
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//axios.interceptors.request.use(function(config) {
//  // 在发送请求之前做些什么
//  config.headers['auth'] = Auth.getAuth();
//  return config;
//}, function(error) {
//  // 对请求错误做些什么
//  return Promise.reject(error);
//});

Vue.use(Vuex);
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.bus = new Vue(); //事件总线

// ---------------------------------------------------------------------------------------------
// // beforeEach 表示的是路由全局钩子
// 任何条件都得含有next()

// ---------------------------------------------------------------------------------------------

// router.beforeEach(({
//  path
// }, from, next) => {
//  var loginState = Boolean(store.state.globalState.loginState)
//  console.log(999)
//  console.log(loginState)
//  //true用户已登录， false用户未登录
//  if(!loginState && path !== '/login') {
//    return next({
//      path: '/login',
//      query: {
//        redirect: path
//      } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//    })
//  } else {
//    next()
//  }
//  //已登录的情况再去登录页，跳转至首页
//  if(path == '/login') {
//    if(loginState) {
//      console.log(2227777)
//      console.log(path)
//      router.push({
//        path: '/'
//      });
//    }
//    next()
//  }
// })

// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
})

Vue.prototype.toast = function(msg, type) {
  vue.$message({
    message: msg,
    type: type || 'error',
    customClass: 'my-element-message'
  });
}