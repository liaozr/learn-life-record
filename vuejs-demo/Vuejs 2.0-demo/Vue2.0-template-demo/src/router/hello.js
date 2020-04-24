const hello = () => import('@v/hello/hello')

// 构建路由表信息
const routes = [	
	{
	   path:'/hello',
	   component:hello,
       name:'hello'
	} 
]
export default routes