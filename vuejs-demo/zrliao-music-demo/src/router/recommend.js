// 之前自己的写法参考

// const homeDetail = resolve => require(['@v/home/homeDetail'], resolve)
// const homesan = resolve => require(['@v/home/homesan'], resolve)
// const recommend = resolve => require(['@v/recommend/recommend'], resolve)

import recommend from '@v/recommend/recommend'  // 导入 recommend.vue 组件

// const disc = resolve => require(['@v/recommend/disc'], resolve)

const disc = () => import('@v/recommend/disc')

// 构建路由表信息
const routes = [	
	{
	   path:'/recommend',
	   component:recommend,
	   name:'recommend',
	   children:[
		   {
			  path:'disc/:id' ,
			  component:disc,
			  name:'disc'
		   }
	   ]
	} 
]
export default routes