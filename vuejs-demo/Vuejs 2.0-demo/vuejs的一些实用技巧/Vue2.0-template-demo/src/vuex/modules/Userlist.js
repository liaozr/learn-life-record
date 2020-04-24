// 导入axios  从而进行异步请求数据
import axios from 'axios'

export default  {
  state: {
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
  },
  mutations:{
    // 点击新建按钮，初始化一个空数据
    ADD_USER(state) {
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
    ADD_SAVE_USER(state) {
        if (state.curEditUser.name == '' || state.curEditUser.name == undefined || state.curEditUser.name == null) {
            state.curEditUser = {}
        } else {
            state.users.push(state.curEditUser);
            state.curEditUser = ''
        }
    },
    // 点击删除操作
    SHANCHU_USER(state, index) {
        // state.curEditUser =''
        state.users.splice(index,1)
        // state.users.$remove(user)
    },
    // 提交 name
    COMMITNAME(state,name)
    {
        state.curEditUser.name=name
    },
    // 提交 age
    COMMITAGE(state,age)
    {
        var age=Number(age)
        state.curEditUser.age=age
    },
    // 提交 tel
    COMMITTEL(state,tel)
    {
       state.curEditUser.tel=tel
    },
    // 点击编辑操作
    EDIT_USER(state,index)
    {
         state.editUser =''
         state.editUser=state.users[index];
    },
    
    // 以下三个是请求数据接口时候的按钮文字状态
    FETCH_TOPICS_SUC (state, data) {
        state.isFetching = false;  
        state.data =data;
        console.log("cccccccc")  
        console.log(data)
    },

    FETCH_MOCK_SUC(state, data) {
        
        state.mockdata =data;
    },
    FETCH_TOPICS_REQ(state) {
        state.isFetching = true
    },
    FETCH_TOPICS_ERR(state, error) {
        state.isFetching = false;
        state.error = error
    }
  },
  actions: {
    delete_user ({ commit},index ) {
        commit('SHANCHU_USER',index)
    },
    addSaveUser ( { commit }) {
        commit('ADD_SAVE_USER')
    },
    addUser ( { commit }) {
        commit('ADD_USER')
    },
    commitname ( { commit },name ) {
        commit('COMMITNAME',name)
    },
    commitage ( { commit },age ) {
        commit('COMMITAGE',age)
    },
    committel ( { commit },tel ) {
        commit('COMMITTEL',tel)
    },
    edit_user ( { commit },index ) {
        commit('EDIT_USER',index)
    },
    fetchTopics ( { commit },canshu ) {

        return new Promise((resolve, reject)=> {

            // 先是 触发  FETCH_TOPICS_REQ 这个 mutations
            commit('FETCH_TOPICS_REQ');

            // actions 异步请求数据
            axios({
                method: 'get',
                url: 'https://www.vue-js.com/api/v1/topics',
                params:canshu
            }).then((response) => {
                 
                 // 数据响应成功，把接口的值先 赋给 data变量
                let data = response.data.data;
                console.log(data)
                
                // 然后再触发  FETCH_TOPICS_SUC 这个 mutations 并把data参数 传过去
                commit('FETCH_TOPICS_SUC',data)

                resolve("数据请求成功");

            }).catch((error) => {
                
                // 响应失败的时候，触发 FETCH_TOPICS_ERR 这个 mutations 并把error参数传过去

                commit('FETCH_TOPICS_ERR', error);

                console.log(error)
            })
        })
    },
    mock ({commit }) {
        return new Promise((resolve, reject)=> {
            axios.get('/index/getList').then(function (response) {
                if(response.data.data.code ==1000){

                    // resolve(response.data.data.data);

                    let data = response.data.data.data;
                    console.log(data)
                    
                    // 然后再触发  FETCH_TOPICS_SUC 这个 mutations 并把data参数 传过去
                    commit('FETCH_MOCK_SUC',data)

                }
            }).catch((error) => {
              console.log(error)
            })
        })
    }
  },
  getters: {
    editname:state => {
      return state.curEditUser.name
    },
    editage:state => {
      return state.curEditUser.age
    },
    edittel:state => {
      return state.curEditUser.tel
    },
    curEdituser:state => {
      return state.editUser
    },
    isFetching:state => {
      return state.isFetching
    },
    data:state => {
      return state.data
    },
    mockdata:state => {
      return state.mockdata
    },
  }
}

