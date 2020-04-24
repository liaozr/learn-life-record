 // The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import axios from 'axios'
Vue.use(axios)

// import VueResource from 'vue-resource'
//如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：
// VueResource官方不再维护，所以使用axios
// Vue.use(VueResource);


Vue.config.debug = true;

import './css/common.css'

// 导入组件
import movie from './page/movie'
import vuexdemo from './page/vuexdemo'
import movielist from './page/movielist'
import moviedetail from './page/moviedetail'
import moviesearch from './page/moviesearch'

const routes = [
    { 
    	path: '/', //一开始就进入这个movie组件
        component:movie
    },
    { 
        path: '/movie',  
        component:movie,
        name:'movie'
    },
    {
        path: '/vuexdemo',
        component: vuexdemo,
        name: 'vuexdemo'
    },
    {
        path: '/movie/list',
        component:movielist,
        name: 'movielist'
    },
    {
        path:'/moviedetail/:id',
        component: moviedetail,
        name: 'moviedetail'
    },
    {
        path:'/movie/search',
        component: moviesearch,
        name: 'moviesearch'
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
  router,
  render: h => h(App)
}).$mount("#app")
