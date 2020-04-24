
// router.js这个文件可以参考下例的做法

import Userlist from './components/Userlist'
import Useredit from './components/Useredit'

export default  router => {   // 等价于下面的 function(router)写法的
    router.map({
      '/': {
        name: 'userlist',
        component: Userlist
      },
      '/userlist': {
        name: 'userlist',
        component: Userlist
      },
      '/useradd': {
        name: 'useradd',
        component: Useredit
      },
      '/useredit/:id': {
        name: 'useredit',
        component: Useredit
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