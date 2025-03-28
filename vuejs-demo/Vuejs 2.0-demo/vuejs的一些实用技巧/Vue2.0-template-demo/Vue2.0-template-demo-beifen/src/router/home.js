
// Home模块路由表

const homeDetail = resolve => require(['@v/home/homeDetail'], resolve)
const homesan = resolve => require(['@v/home/homesan'], resolve)

// 构建路由表信息
const routes = [	
	{
	   path:'/homeDetail',
	   component:homeDetail,
	   name:'homeDetail',
	   meta: {
	      title: 'homeDetail',
	      keepAlive: false // 需要被缓存
	   }
	},
	{
	   path:'/homesan',
	   component:homesan,
	   name:'homesan',
	   meta: {
	      title: 'homesan',
	      keepAlive: false // 需要被缓存
	   }
	}	 
]
export default routes