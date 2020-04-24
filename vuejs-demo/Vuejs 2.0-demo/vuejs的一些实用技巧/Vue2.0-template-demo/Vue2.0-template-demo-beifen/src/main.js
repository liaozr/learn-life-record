// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'       //引入vue模块
import App from './App'    //引入vue组件 

import 'babel-polyfill'

import router from './router'  // 导入路由配置文件

// 使用 vuex 单向数据流
import store from './vuex/store'

// 使用 Muse UI 组件
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)

//实例化参数
Vue.use(require('vue-wechat-title')); 

// -----------------------------------------------------------------------------------

//  使用 axios 请求数据
import axios from 'axios'
Vue.prototype.$http=axios
// Vue.use(axios)


// http response 拦截器
axios.interceptors.response.use(
	response => {
	    return response;
	},
	error => {
	    if (error.response) {
	        switch (error.response.status) {
	            case 401:

                // 返回 401 清除token信息并跳转到登录页面
                store.commit(types.LOGOUT);
                router.replace({
                    path: 'login',
                    query: {redirect: router.currentRoute.fullPath}
                })
	                
	        }
	    }
	    // 返回接口返回的错误信息
	    return Promise.reject('请求错误')  
	    // return Promise.reject(error.response.data)   
	});



import moment from 'moment';
Object.defineProperty(Vue.prototype, '$moment', { value: moment });

// 优雅的方式
// 在 Vuejs 项目中使用 JavaScript 库的一个优雅方式是讲其代理到 Vue 的原型对象上去. 
// 按照这种方式, 我们引入 Moment 库:
// import moment from 'moment';
// Object.defineProperty(Vue.prototype, '$moment', { value: moment });

// 由于所有的组件都会从 Vue 的原型对象上继承它们的方法, 
// 因此在所有组件/实例中都可以通过 this.$moment: 的方式访问 Moment 
// 而不需要定义全局变量或者手动的引入.

// 如：MyNewComponent.vue

// export default {
//   created() {
//     console.log('The time is ' . this.$moment().format("HH:mm"));
//   }
// }

// -----------------------------------------------------------------------------------

// 把 mock 模拟的数据导出 ,在项目中全局使用
import mock from './mock/mock'

// 导入 vue-awesome-swiper 组件 并告诉vue 使用 这个组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)


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
