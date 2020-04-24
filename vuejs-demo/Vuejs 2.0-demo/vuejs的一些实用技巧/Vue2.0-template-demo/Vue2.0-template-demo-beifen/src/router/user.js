
// user模块路由表

// 懒加载二级组件
const addUser = resolve => require(['@v/user/addUser'], resolve)
const userDetail = resolve => require(['@v/user/userDetail'], resolve)


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
	},
    {
	   path:'/edit_user/:id',
	   component:addUser,
	   name:'useredit',
	   meta: {
	      title: 'useredit',
	      keepAlive: false // 不需要被缓存
	   }
	},
	{
	   path:'/userDetail',
	   component:userDetail,
	   name:'userDetail',
	   meta: {
	   	  title: 'userDetail',
	      keepAlive: false // 不需要被缓存
	   }
	}
]

export default routes