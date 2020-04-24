

// 在 vuex/ 下面建立一个 getter.js 文件，用来从 store 获取数据。


// 第四步：在组件获取值

// 创建一个新的文件 vuex/getters.js：

// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count
// ----------------------------------------------------------------

// 获取notelist,这里将会根据state.show的状态 做数据过滤

// 函数是filteredNotes ，参数是 state
// 通过 getters的 filteredNotes来获取 所有的笔记列表

// 如果是  state.show === 'all' 就return返回 state.notes ||{}
// 如果是  state.show === 'favorite' 就return 返回 
//   state.notes.filter(note => note.favorite) ||{}

export const filteredNotes = (state) =>{
      if(state.show ==='all')
      {
      	return state.notes || {}
      }
      else if(state.show === 'favorite'){
          return state.notes.filter(note => note.favorite) || {}
          // 这个是return 返回所有的 favorite 笔记的了
      }
}

// 获取列表展示状态 ：all or favorite
export const show =(state) =>{
	return state.show
}

// 获取当前激活note
export const activeNote =(state) =>{
	return state.activeNote
}


// 我们现在在组件里加入这个 getter 函数。
// <!-- State（状态），Mutations（变更） 和 Actions（动作）。 -->


// The state tree：Vuex 使用单一状态树，
// 用一个对象就包含了全部的应用层级状态。
// 至此它便作为一个『唯一数据源(SSOT)』而存在。
// 这也意味着，每个应用将仅仅包含一个 store 实例。
// 单状态树让我们能够直接地定位任一特定的状态片段，
// 在调试的过程中也能轻易地取得整个当前应用状态的快照。

// getters：用来从 store 获取 Vue 组件数据。

// mutators：事件处理器用来驱动状态的变化。

// actions：可以给组件使用的函数，以此用来驱动事件处理器 mutations