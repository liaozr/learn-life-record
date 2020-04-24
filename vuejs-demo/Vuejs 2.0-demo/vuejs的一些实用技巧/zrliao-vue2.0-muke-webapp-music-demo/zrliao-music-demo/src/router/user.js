// user模块路由表
// 懒加载二级组件
// const addUser = resolve => require(['@v/user/addUser'], resolve)

const addUser = () => import('@v/user/addUser')

// 构建路由表信息
const routes = [
    {
	   path:'/useradd',
	   component:addUser,
	   name:'addUser',
	   meta: {
	   	  title: 'addUser',
	      keepAlive: false // 不需要被缓存
	   }
	}
]

export default routes