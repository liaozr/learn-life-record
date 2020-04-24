
// router.js这个文件可以参考下例的做法

import Index from './components/Index'
import Topic from './components/Topic'
import Login from './components/Login'
import jingxuan from './components/jingxuan'
import article from './components/article'
import topicarticle from './components/topicarticle'
import download from './components/download'

export default  router => {   // 等价于下面的 function(router)写法的
    router.map({  
      '/index': {
        name: 'index',
        component: Index,
        activeClass:'active',
        subRoutes:{
          '/article':{
            component:article,
            name:'article'
          }
        }
      },
      '/topic': {
        name: 'topic',
        component: Topic,
        activeClass:'active',
        subRoutes:{
          '/article':{
            component:topicarticle,
            name:"topicarticle"
          }
        }
      },
      '/login': {
        name: 'login',
        component: Login,
        activeClass:'active'
      },
      '/jingxuan':{
        name:'jingxuan',
        component:jingxuan
      },
      '/register': {
        name: 'register',
        component: Login,
        activeClass:'active'
      },
      '/download':{
        name:'download',
        component:download,
        activeClass:'active'
      }
    })
}

// export default function(router) { 
//     router.map({
//       '/': {
//         name: 'userlist',
//         component: Userlist
//       },
//       '/userlist': {
//         name: 'userlist',
//         component: Userlist
//       },
//       '/Useredit/:id': {
//         name: 'useredit',
//         component: Useredit
//       }
//     })
// }