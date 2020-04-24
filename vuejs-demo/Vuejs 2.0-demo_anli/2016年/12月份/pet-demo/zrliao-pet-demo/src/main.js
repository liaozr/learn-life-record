 // The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

 
import store from './vuex/store'
import mock from './server/mock'

// 使用基于vue的swiper组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// import VueResource from 'vue-resource'
//如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：
// VueResource官方不再维护，所以使用axios
// Vue.use(VueResource);


// import mock from './server/mock'

Vue.config.debug = true;

window.log = console.log;

import Index from './page/index'
import Page1 from './page/page1'
import Home from './page/home'
import HomeUserInfo from './page/homeUserInfo'
import MyPet from './page/myPet'
import AddPet from './page/addPet'

// import Article from './page/article'


const routes = [
    { 
    	path: '/', 
    	component: Index,
    	name:'all', 
    },	
    { 
		path: '/index',
		name:'index', 
		component: Index 
    },
    { 
    	path: '/page1',
    	name:'page1', 
    	component: Page1 
    },
    { 
    	path: '/home', 
    	name:'home', 
    	component: Home
    },
    {
         path:'/HomeUserInfo/:uid', 
         name:'homeUserInfo', 
         component: HomeUserInfo 
    },
    { 
        path:'/home/mypet', 
        name:'myPet', 
        component : MyPet
    },
    { 
       path:'/home/mypet/addpet', 
       name:'addPet', 
       component: AddPet
    }
]

const router = new VueRouter({
	mode: 'history',
    linkActiveClass: 'active',
    //router-link的选中状态的class，也有一个默认的值
    routes
})


/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app")
