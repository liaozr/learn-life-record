import Vue from 'vue'               //引入vue模块
import App from 'App.vue'           //引入vue组件

import VueRouter from 'vue-router'  // 引入路由配置文件
Vue.use(VueRouter)                  //全局注册Router组件，它会绑定到Vue实例里面。

// 使用 vuex 单向数据流
import store from './vuex/store'

// 使用 Muse UI 组件
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)

import Home from './page/Home'         // 导入 Home.vue 组件
import user from './page/user'         // 导入 user.vue 组件
import addUser from './page/addUser'  // 导入 addUser.vue 组件
import axiosdata from './components/axiosdata' // 导入 axiosdata.vue 组件

const routes = [
  {
	   path:'/',
	   component:Home
	},
	{
	   path:'/home',
	   component:Home,
	   name:'home'
	},
  {
	   path:'/user',
	   component:user,
	   name:'user'
	},
  {
	   path:'/useradd',
	   component:addUser,
	   name:'addUser'
	},
  {
	   path:'/edit_user/:id',
	   component:addUser,
	   name:'useredit'
	},
  {
     path:'/axiosdata',
     component:axiosdata,
     name:'axiosdata'
  }
]

const router = new VueRouter({
	  mode: 'history',
    linkActiveClass: 'active',
    routes
})

/* eslint-disable no-new */

new Vue({
  // 导入路由 router 跟 vuex store 到项目里
  router,
  store,
  render: h => h(App)
}).$mount("#app")
