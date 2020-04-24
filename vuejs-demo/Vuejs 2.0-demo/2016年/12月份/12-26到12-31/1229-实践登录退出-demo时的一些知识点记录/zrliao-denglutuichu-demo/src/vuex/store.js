 // 第一步：加入 store

// store 存储应用所需的数据。所有组件都从 store 中读取数据。

// <!-- State（状态），Mutations（变更） 和 Actions（动作）。 -->

import Vue from 'vue'
import Vuex from 'vuex'
 
import * as actions from './actions'
import * as getters from './getters'

// 导入各个模块的初始状态states 和 mutations 
import users from './modules/users'
 

// 告诉 vue '使用' vuex
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    users
  }
})
export default store




 



 
 