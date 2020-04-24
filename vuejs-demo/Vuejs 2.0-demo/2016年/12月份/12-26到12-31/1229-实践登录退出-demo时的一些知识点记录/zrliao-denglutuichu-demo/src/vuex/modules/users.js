
// 可以写成下面这种形式的
// import { GETSTARTLIST} from '../mutation-types' 
// import { GETTERSLISTS} from '../mutation-types' 
// -------------------------------------------------

// 不过相比上面那种形式，是更推荐下面的这种写法的。而且尤大的案例写法也是以这种形式的

// 这种写法的好处是 假如mutation-types里面有很多个变量的时候，要一个个的引入到各自的模块里去，这样就不是很方便了
// import * as types from '../mutation-types' 这个的做法就是 将所有常量导成一个对象, 从而更方便的使用
// 但引入了这样子写法的该模块的mutations的写法就将变成 types.GETSTARTLIST代表着原有的GETSTARTLIST的了
// 如下所示：
// const mutations = {
//   [types.GETSTARTLIST] (state)
//   {
//     state.curlisttype=''
//     state.curlisttype=state.hot
//   }
// } 

import * as types from '../mutation-types'

// 该模块的初始状态 
const state = {
     users_msg:JSON.parse(sessionStorage.getItem('user')) || {}
} 


// 在使用上，session Storage和local Storage大同小异，只是
// sessionStorage是将数据临时存储在session中，浏览器关闭，数据随之消失。
// 而localStorage则是将数据存储在本地，理论上来说数据永远不会消失，除非人为删除。

// API：
// 保存数据 localStorage.setItem(key, value); sessionStorage.setItem( key, value );

// 读取数据 localStorage.getItem(key); sessionStorage.getItem( key );

// 删除单个数据localStorage.removeItem(key); sessionStorage.removeItem( key );

// 删除全部数据localStorage.clear(); sessionStorage.clear( );

// 获取索引的 keylocalStorage.key(index); sessionStorage.key( index );


// ----------------------------------------------------------------------------------
// 相关的 mutations
const mutations = {

    [types.USER_SIGNIN](state,user_message)
    {    
        // JSON.stringify()用于从一个对象解析出字符串
        sessionStorage.setItem('user', JSON.stringify(user_message))
        state.users_msg=user_message
    },
    [types.QUIT_CLEAR](state)
    {      
         sessionStorage.removeItem('user')
         state.users_msg=''
    }
} 

export default { 
	state, 
	mutations 
}


