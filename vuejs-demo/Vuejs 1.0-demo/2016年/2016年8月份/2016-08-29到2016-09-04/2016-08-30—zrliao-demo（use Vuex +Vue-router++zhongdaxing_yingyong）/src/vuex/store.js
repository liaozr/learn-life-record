// 第一步：加入 store

// store 存储应用所需的数据。所有组件都从 store 中读取数据。

// <!-- State（状态），Mutations（变更） 和 Actions（动作）。 -->

import Vue from 'vue'
import Vuex from 'vuex'

// 导入各个模块的初始状态state 和 mutations 
import orderList from './modules/orderList' 

Vue.config.debug = true

// 告诉 vue '使用' vuex
Vue.use(Vuex)

export default new Vuex.Store({ 

// 组合各个模块
 modules: { 
  orderList 
 }

})
 

// 由于我们把store拆分到不同的模块，所以创建
// store实例的时候需要引入orderList模块(这里是modules模块文件夹下的各个模块才行的)
// 它包括账单列表orders对象和当前被激活的账单对象activeOrder。
// 需要定义的mutation只有一个"SHOW_DETAIL",
// 当用户点击账单列表的某一个账单的时候，
// SHOW_DETAIL更新store的activeOrder，表示当前被展开的账单对象。


 