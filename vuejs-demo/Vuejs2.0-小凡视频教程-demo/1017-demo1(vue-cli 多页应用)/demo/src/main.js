// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'

// 引入 element-ui库
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Element)

// 上面的路由配置可以写成下面的那种配置这样子的

// const router = new VueRouter({
//   mode: 'history',
//   linkActiveClass: 'active',
//   routes: [
//     { 
//     	path: '/dashboard',
//     	component: Dashboard
//     },
//     { 
//     	path: '*', 
//     	component: Dashboard
//     }
//   ]
// })


/* eslint-disable no-new */

new Vue({
  render: h => h(App)
}).$mount("#app")
