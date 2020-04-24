// import singer from '@v/singer/singer'  // 导入 singer.vue 组件
// const singerDetail = resolve => require(['@v/singer/singerDetail'], resolve)


const singer = () => import('@v/singer/singer')
const singerDetail = () => import('@v/singer/singerDetail')

// 构建路由表信息
const routes = [	
	{
	   path:'/singer',
	   component:singer,
	   name:'singer',
	   children:[
		   {
			   path:'singerDetail/:id',
			   component:singerDetail,
			   name:'singerDetail'
		   }
	   ]
	} 
]
export default routes