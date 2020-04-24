import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 构建路由表信息
import goodsList from './goodsList'
import hello from './hello'

export default new Router({
  routes: [
    ...goodsList,
    ...hello,
    // 重定向路由，表示一开始的路由是渲染到 page1 组件
    {
       path:'/',
	     redirect:'/goodsList'
    }
  ]
})
