// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

 
import store from './vuex/store'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'


import 'bootstrap/dist/css/bootstrap.css'

// 引入 mint-ui 
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.use(VueRouter)
Vue.use(VueResource)


import Userlist from './components/Userlist'
import Useredit from './components/Useredit'

// 用了异步组件的话就不需要加上这句了
// import LogTime from './components/LogTime'

const routes = [
  {
	   path:'/',
	   component:Userlist
	},
	{
	   path:'/userlist',
	   component:Userlist
	},
	{
      path:'/useradd',
      component: Useredit
	},
  {
      path:'/useredit/:id',
      name:'useredit',
      component: Useredit
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
