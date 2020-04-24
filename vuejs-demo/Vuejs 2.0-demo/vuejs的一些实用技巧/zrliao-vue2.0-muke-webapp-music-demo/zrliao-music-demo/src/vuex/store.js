
// 第一步：加入 store

// store 存储应用所需的数据。所有组件都从 store 中读取数据。

// <!-- State（状态），Mutations（变更） 和 Actions（动作）。 -->

import Vue from 'vue'
import Vuex from 'vuex'

// 导入各个模块的初始状态states、mutations、actions、getters
import modules from "./modules"

// 告诉 vue '使用' vuex
Vue.use(Vuex)

// debug 模式调试 
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
   modules,
   strict: debug  // 调试模式开启严格模式，生产模式不开启严格模式
})
export default store


/*
巧用vuex进行数据提前加载。 有一个详情页面，一堆选择框是需要从后台读取数据的（而且这个接口返回速度较慢），

这个时候可以借助vuex在这个页面之前的一个必经页面提前进行数据加载。

由于vuex computed 取到的数据还是响应式的，你不好去改变它，

这个时候可以通过JSON.stringify 和 JSON.parse 把 响应式数据变换成为正常数组。*/