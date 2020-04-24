const routes = [
 //    ...home,
 // ...Users,

   ...recommend,
   ...singer,
   ...rank,
   ...search,
   ...userCenter,
   // 重定向路由，表示一开始的路由是渲染到 recommend组件
   {
     path:'/',
     redirect:'/recommend'
   }
]
