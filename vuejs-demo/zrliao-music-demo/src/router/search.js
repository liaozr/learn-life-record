// import search from '@v/search/search'  // 导入 search.vue 组件
// const singerDetail = resolve => require(['@v/singer/singerDetail'], resolve)

const search = () => import('@v/search/search')
const singerDetail = () => import('@v/singer/singerDetail')

// 构建路由表信息
const routes = [	
	{
	   path:'/search',
	   component:search,
	   name:'search',
	   children:[
		   {
			  path:':id',
			  component:singerDetail,
			  name:'searchDetail',
		   }
	   ]
	} 
]
export default routes