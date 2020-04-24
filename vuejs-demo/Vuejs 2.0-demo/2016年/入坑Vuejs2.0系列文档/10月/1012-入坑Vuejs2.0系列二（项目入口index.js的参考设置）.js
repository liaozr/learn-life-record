
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'

import store from './vuex/store'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

import index from './components/index'
import details from "./components/details"

const routes = [
 {
    path:'/',
    component:index,
    name:'index'
 },
 {
   path:'/details',
   component:details,
   name:'details'
 }
]

const router = new VueRouter({
   mode: 'history',
   linkActiveClass: 'active',
   routes
})

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
 store,
 router,
 render: h => h(App)
}).$mount("#app")
