
// 懒加载二级组件
// const userCenter = resolve => require(['@v/userCenter/userCenter'], resolve)

const userCenter = () => import('@v/userCenter/userCenter')

// 构建路由表信息
const routes = [
    {
	   path:'/user',
	   component:userCenter,
	   name:'userCenter'
	}
]
export default routes