// import rank from '@v/rank/rank'  // 导入 rank.vue 组件

// const topList = resolve => require(['@v/rank/topList'], resolve)


const rank = () => import('@v/rank/rank')

const topList = () => import('@v/rank/topList')

// 构建路由表信息
const routes = [	
	{
	   path:'/rank',
	   component:rank,
       name:'rank',
       children:[
           {
             path:'topList/:id',
             component:topList,
             name:'topList'  
           }
       ]
	} 
]
export default routes