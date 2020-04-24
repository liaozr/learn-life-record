// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'

import store from './vuex/store'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'


// 引入 element-ui库
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Element)


Vue.use(VueRouter)
Vue.use(VueResource)

import Index from './components/Index'
import Topic from './components/Topic'
import Login from './components/Login'
import jingxuan from './components/jingxuan'
import article from './components/article'
import topicarticle from './components/topicarticle'
import download from './components/download'

const routes = [
    {
	   path:'/',
	   component:Index,
	   children:[
	          {
		        path: '',
		        component: article,
		        name:'article'
	          }
	   ]
	},
	{
	   path:'/index',
	   component:Index,
	   name:'index',
	   children:[
	          {
		        path: 'article',
		        component: article,
		        name:'article'
	          }
	    ]
	},
	{
		path:'/topic',
		component:Topic,
		children:[
	          {
		        path: 'articleTopic',
		        component: topicarticle,
		        name:'topicarticle'
	          }
	    ]
		 
	},
	{
		path:'/login',
		component:Login
	},
	{
		path:'/jingxuan',
		component:jingxuan
	},
	{
		path:'/register',
		component:Login
	},
	{
		path:'/download',
		name:'download',
        component:download
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
