 // The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import store from './vuex/store'
 
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// import VueResource from 'vue-resource'
//如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：
// VueResource官方不再维护，所以使用axios
// Vue.use(VueResource);


Vue.config.debug = true;

window.log = console.log;

import './css/common.css'

 /**
 * auth true登录才能访问，false不需要登录，默认true
 */

const routes = [
    { 
    	path: '/', //首页
        meta: { auth: true },
        component: resolve => require(['./page/index'], resolve)
    },
    {
        path: '/login', //登录
        meta: { auth: true },
        name:'login',
        component: resolve => require(['./page/login'], resolve)
    },
    {
        path: '/signout', //退出
        name:'signout',
        component: resolve => require(['./page/signout'], resolve)
    },
    {
        path: '/home', //个人主页
        name:'home',
        component: resolve => require(['./page/home'], resolve)
    },
    {
        path: '*', //其他页面，强制跳转到登录页面
        redirect: '/login'
    }

]

const router = new VueRouter({
	mode: 'history',
    linkActiveClass: 'active',
    //router-link的选中状态的class，也有一个默认的值
    routes
})


// 全局钩子
// 你可以使用 router.beforeEach 注册一个全局的 before 钩子：

// 下面这段代码的作用是判断你未登录时，突然间把
// 浏览器上的地址改为 localhost:8085/home的时候（要登录后才能看的页面的时候）
// 会自动跳转到 path:"/login" 登录页面的

// 每个路由进入前进行判断，满足条件才进行跳转，否则跳转到特定的页面

router.beforeEach(({meta, path}, from, next) => {
    var { auth = false } = meta
    //true用户已登录， false用户未登录

    // 转换成布尔值
    var isLogin = Boolean(store.state.users.users_msg.id) 

    if (!auth && !isLogin && path !== '/login') {
        console.log("需要你先登录")
        return next({ path: '/login' })
    }
    next()
})

// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

// next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。

// next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。

// next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

// 确保要调用 next 方法，否则钩子就不会被 resolved。


/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app")
