
import goodsList from '@v/goodsList/goodsList'  // 导入 page1.vue 组件
// const disc = () => import('@v/recommend/disc')

// 构建路由表信息
const routes = [	
	{
	   path:'/goodsList',
	   component:goodsList,
	   name:'goodsList'
	} 
]
export default routes