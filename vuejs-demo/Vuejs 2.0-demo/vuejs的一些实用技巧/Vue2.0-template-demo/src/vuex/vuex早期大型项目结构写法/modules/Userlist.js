
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
    users: [
    ],
    curEditUser: {
    },
    editUser:{
    },
    isFetching:false,
    data:[],
    mockdata:[],
    error:''

}

// 相关的 mutations
// 要记得 mutations 里面 不同 mutation之间  是要 加逗号的

const mutations = {

    // 点击新建按钮，初始化一个空数据
    [types.ADD_USER](state) {
        var userLength = state.users.length + 1
        var newAdduser = {
            id: userLength,
            name: '',
            age: '',
            tel: ''
        }
        state.curEditUser = '';
        state.curEditUser = newAdduser;
        state.curEditUser.id = newAdduser.id
    },
    // 点击保存按钮
    [types.ADD_SAVE_USER](state) {
        if (state.curEditUser.name == '' || state.curEditUser.name == undefined || state.curEditUser.name == null) {
            state.curEditUser = {}
        } else {
            state.users.push(state.curEditUser);
            state.curEditUser = ''
        }
    },
    // 点击删除操作
    [types.SHANCHU_USER](state, index) {
        // state.curEditUser =''
        state.users.splice(index,1)
        // state.users.$remove(user)
    },
    // 提交 name
    [types.COMMITNAME](state,name)
    {
        state.curEditUser.name=name
    },
    // 提交 age
    [types.COMMITAGE](state,age)
    {
        var age=Number(age)
        state.curEditUser.age=age
    },
    // 提交 tel
    [types.COMMITTEL](state,tel)
    {
       state.curEditUser.tel=tel
    },
    // 点击编辑操作
    [types.EDIT_USER](state,index)
    {
         state.editUser =''
         state.editUser=state.users[index];
    },
    
    // 以下三个是请求数据接口时候的按钮文字状态

    [types.FETCH_TOPICS_SUC] (state, data) {
        state.isFetching = false;  
        state.data =data;
        console.log("cccccccc")  
        console.log(data)
    },

    [types.FETCH_MOCK_SUC] (state, data) {
        
        state.mockdata =data;
    },
    
    [types.FETCH_TOPICS_REQ] (state) {
        state.isFetching = true
    },

    [types.FETCH_TOPICS_ERR] (state, error) {
        state.isFetching = false;
        state.error = error
    }
}

export default {
    state,
    mutations
}
