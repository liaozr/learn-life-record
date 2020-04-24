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
   notes:[],
   activeNote:{},
   show:''
}


// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  // mutation 的第一个参数是当前的 state
  // 你可以在函数里修改 state


  // 初始化state
  INIT_STORE(state,data){
    state.notes=data.notes,
    state.show=data.show,
    state.activeNote=data.activeNote
  },

  // 新增笔记
  NEW_NOTE(state){
    var newNote={
      id:+new Date(),
      title:'',
      content:'',
      favorite:false
    }
    state.notes.push(newNote)
    state.activeNote=newNote
  },

  // 修改笔记

     // 找到对应的 id 的对象，
    // 因为state.notes.id是通过这样获取到的:+new Date(),
   // 重新赋值，因为前面提到过，我们的数据是响应式的， 

   EDIT_NOTE(state,note){
    state.activeNote=note
    // 修改原始数据
    for(var i=0; i<state.notes.length;i++)
    {
      if(state.notes[i].id == note.id){
         console.log(note)
         state.notes[i] =note
         break
      }
    }
   },

  // 删除笔记
  // 删除笔记，移除$remove当前的activeNote。
  // 并把当前的activeNote 设置为 state.notes[0]( 为所有笔记的第一个笔记 )
  DELETE_NOTE(state){
    state.notes.$remove(state.activeNote)
    state.activeNote=state.notes[0] || {} 
  },

  // 切换笔记的收藏与取消收藏
   TOGGLE_FAVORITE(state){
    state.activeNote.favorite = !state.activeNote.favorite
  },

    // 切换显示数据列表类型：全部 or 收藏
   // 点击 All Notes列表 跟 Favorites列表  
  // 这步动作的主要 作用就是  改变 state.show的值

  SET_SHOW_ALL(state,show){
     state.show=show
    // 切换数据显示，需要同步更新 activeNote
    if( show === 'favorite'){

      // state.notes为一个数组, 过滤出数组中favorite为真的
      // 并取出第一个, 如果不存在则默认为空对象
      // filter 是ES6新的数组方法来的
      state.activeNote=state.notes.filter(note => note.favorite)[0] || {}
    }
    else{
      state.activeNote=state.notes[0] || {}  //不是favorite的话，就将state.notes[0]
                                            // （所有笔记的第一个设置为state.activeNote）
    }
    // 点击 All Notes跟 Favorites 之间切换，如果 show === 'favorite'
    // 那么就将state.activeNote 当前活动笔记 设置为 state.notes.filter(note => note.favorite)[0]
    // state.notes.filter(note => note.favorite)[0] 这个为 state.notes为一个数组,
    // 过滤出数组中favorite为真的，并取出第一个作为当前状态被激活的笔记（state.activeNote）
  },

  // 设置当前激活的笔记
  SET_ACTIVE_NOTE(state,note){
    state.activeNote=note
  }
}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations
})



// The state tree：Vuex 使用单一状态树，
// 用一个对象就包含了全部的应用层级状态。
// 至此它便作为一个『唯一数据源(SSOT)』而存在。
// 这也意味着，每个应用将仅仅包含一个 store 实例。
// 单状态树让我们能够直接地定位任一特定的状态片段，
// 在调试的过程中也能轻易地取得整个当前应用状态的快照。

// getters：用来从 store 获取 Vue 组件数据。

// mutators：事件处理器用来驱动状态的变化。

// actions：可以给组件使用的函数，以此用来驱动事件处理器 mutations