// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

 
import store from './vuex/store'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'


import 'bootstrap/dist/css/bootstrap.css'

Vue.use(VueRouter)
Vue.use(VueResource)


import Home from './components/Home'
import TimeEntries from './components/TimeEntries'

// 用了异步组件的话就不需要加上这句了
// import LogTime from './components/LogTime'

const routes = [
    {
	   path:'/',
	   component:Home
	},
	{
	   path:'/home',
	   component:Home
	},
	{
      path:'/time-entries',
      component: TimeEntries,
      children:[
          {
             path:'log-time',
             // component:LogTime
             
             // LogTime属于我们TimeEntries组件的一个子路由，所以我们依旧需要配置下我们的路由，并且利用webpack让它懒加载，减少我们首屏加载的流量

             component : resolve => require(['./components/LogTime'],resolve),
          }
      ]
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
