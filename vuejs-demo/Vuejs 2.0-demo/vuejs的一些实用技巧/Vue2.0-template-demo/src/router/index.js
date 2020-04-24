
import Vue from 'vue'             //引入vue 模块
import Router from 'vue-router' //引入vue-router 模块
// 使用路由
Vue.use(Router)
// ---------------------------------------------------------------------------------------------

// 路由拆分，导入其他的路由模块 

// 拆分路由的时候，最好是 拆分出来的路由模块跟  router下的默认 index.js同级是最好的，

// 理由是 方便 导入组件  import elmHome from '@/views/element/elmHome'  这种形式导入组件

import home from './home' 
import Users from './user'

// ---------------------------------------------------------------------------------------------
// 导入组件到路由表的示例
// import Hello from '@/components/Hello'

// 导入各个组件

import axiosdata from '@v/axiosdata/axiosdata' // 导入 axiosdata.vue 组件

import main from '@v/main/main'

import Home from '@v/home/Home'         // 导入 Home.vue 组件

import user from '@v/user/user'         // 导入 user.vue 组件

import login from '@v/login/login'  // 导入 login.vue 组件

// ---------------------------------------------------------------------------------------------

//  导入 element 相关组件
// import elmHome from '@/views/element/elmHome'

// 懒加载路由
// 当路由被访问的时候才加载对应组件

const elmHome = resolve => require(['@v/element/elmHome'], resolve)

const homechild = resolve => require(['@v/home/homechild'], resolve)

// const elmHome = resolve => require(['./../views/element/elmHome'], resolve)

// ---------------------------------------------------------------------------------------------

// 数组内合并数组
// let arr2 = [1, 2, ...arr1, 4];

// ---------------------------------------------------------------------------------------------

// 构建路由表信息
const routes = [
    {
	   path:'/',
	   component:main,
	   meta: {
	   	  title: '首页',
	      keepAlive: false, // 需要被缓存
	      navShow: true   // 表示此路由需要显示底部导航栏
	   },
	   children:[
			{
			   path:'',
			   component:Home,
			   name:'home',
			   meta: {
				   	  title: '首页',
				      keepAlive: false, // 需要被缓存
				      navShow: true  
			   },
			   children:[
		            {
			           	path:'child',
			           	component:homechild,
			           	name:"homechild",
			           	meta: {
					   	  title: '首页',
					      keepAlive: false, // 需要被缓存
					      navShow: true  
						}
		            }
			   ]
			  
			},
		    {
		       path:'axiosdata',
		       component:axiosdata,
		       name:'axiosdata',
		       meta: {
		       	  title: 'axiosdata',
			      keepAlive: true, // 需要被缓存
			      navShow: true,
			      isLogin: true   // isLogin 是否要登录，为true时，表示必须要登录
			   }
		    },
		    //  Element 相关组件
		    {
			   path:'elmHome',
			   component:elmHome,
			   name:"elmHome",
			   meta: {
			   	  title: 'elmHome',
			      keepAlive: false, // 需要被缓存
			      navShow: true,
			      isLogin: true 
			   }
			},
			{
			   path:'user',
			   component:user,
			   name:'user',
			   meta: {
			      title: 'user',
			      keepAlive: false, // 不需要被缓存
			      navShow: true  
			   }
			},
			{
			   path:'login',
			   component:login,
			   name:'login',
			   meta: {
			      title: 'login',
			      keepAlive: false, // 不需要被缓存
			      navShow: true  
			   }
			}
	   ]
	},
	
	...home,
	...Users,
	// 这个是防止出现空白页面的，当路由匹配不到路径时，映射到默认的home组件上
    {
	   path:'*',
	   component:main,
	   meta: {
	   	  title: '首页',
	      keepAlive: false, // 需要被缓存
	      navShow: true  
	   }
	}
]

// ---------------------------------------------------------------------------------------------

// 导出路由
export default new Router({
    // mode: 'history',
    linkActiveClass: 'active',
    routes
})

// ---------------------------------------------------------------------------------------------
