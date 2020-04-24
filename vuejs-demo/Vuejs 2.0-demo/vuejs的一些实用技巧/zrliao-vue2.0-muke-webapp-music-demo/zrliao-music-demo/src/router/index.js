
import Vue from 'vue'             //引入vue 模块
import Router from 'vue-router' //引入vue-router 模块
// 使用路由
Vue.use(Router)

// ---------------------------------------------------------------------------------------------

// 构建路由表信息

// import home from './home' 
// import Users from './user'

import recommend from './recommend'
import singer from './singer'
import rank from './rank'
import search from './search'
import userCenter from './userCenter'

const routes = [
 //    ...home,
 // ...Users,

   ...recommend,
   ...singer,
   ...rank,
   ...search,
   ...userCenter,
   // 重定向路由，表示一开始的路由是渲染到 recommend组件
   {
       path:'/',
	   redirect:'/recommend'
   }
]

// ---------------------------------------------------------------------------------------------

// 导出路由
export default new Router({
    // mode: 'history',  // 开启之后，需要后端的一些配置，且打包之后，dist目录下直接双击打开index页面会出现异常
    linkActiveClass: 'router-active',  // 表示的是 路由切换时的当前路由的样式名
    routes
})

// ---------------------------------------------------------------------------------------------
