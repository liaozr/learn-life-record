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

// --------------------------------------------------------------------------------------------------------------------

// main.js里面主要思想就是给路由增加一个索引存到sessionStorage里面，以点击过的索引值不变，新增加的路由，索引增加1，同时count+1，这样在页面切换时通过比较索引值的大小，大的向右小的向左，做到左右有规律的过渡。

const history = window.sessionStorage;
history.clear()
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);

// beforeEach 表示的是路由全局钩子
router.beforeEach(({meta, path},from, next) => {
    
    // 过渡效果的判断
    const toIndex = history.getItem(path);
    const fromIndex = history.getItem(from.path);

    if (toIndex) {
        if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
          store.commit('UPDATE_DIRECTION', {direction: 'forward'})
        } else {
          store.commit('UPDATE_DIRECTION', {direction: 'reverse'})
        }
    } else {
        ++historyCount;
        history.setItem('count', historyCount);
        path !== '/' && history.setItem(path, historyCount);
        store.commit('UPDATE_DIRECTION', {direction: 'forward'})
    }

// -------------------------------------------------------------------------------------------------

    // 判断组件是否要登录
    var isLogin=meta.isLogin; 
    // isLogin 表示的是 这个路由组件要不要登录
    
    var loginState = Boolean(store.state.globalState.loginState) 

    //true用户已登录， false用户未登录
    if (isLogin && !loginState && path !== '/login') {
    	alert('请先登录');
      return next({ 
         path:'/login',
         query: {redirect:path} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
    else{
      next()
    }

})

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
