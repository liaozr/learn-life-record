// 第一步：加入 store

// store 存储应用所需的数据。所有组件都从 store 中读取数据。

// <!-- State（状态），Mutations（变更） 和 Actions（动作）。 -->

import Vue from 'vue'
import Vuex from 'vuex'

Vue.config.debug = true

// 告诉 vue “使用” vuex
Vue.use(Vuex)


// 创建一个对象来保存应用启动时的初始状态
const state = {
  // 应用启动时，count 置为0
  count: 0,
  re_count:0
}



// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  // mutation 的第一个参数是当前的 state
  // 你可以在函数里修改 state
  INCREMENT (state, amount) {
    state.count = state.count + amount
  },
  RECREMENT (state, amount) {
  	if(state.count >0 ){
      state.count =state.count -amount
  	}
  	else{
        state.count=0
  	}
  }
}



// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations
})