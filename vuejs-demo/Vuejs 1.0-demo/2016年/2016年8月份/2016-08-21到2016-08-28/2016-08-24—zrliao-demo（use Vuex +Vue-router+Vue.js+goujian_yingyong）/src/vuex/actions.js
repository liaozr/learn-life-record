
// action 是一种专门用来被 component 调用的函数。

// actions 是用于dispatch mutations的函数
// 一个action 可以dispatch多个  mutations

// action 函数能够通过分发相应的 mutation 函数，
// 来触发对 store 的更新。action 也可以先从 HTTP 
// 后端或 store 中读取其他数据之后再分发更新事件。

// action 会收到 store 作为它的第一个参数

// 既然我们只对事件的分发（dispatch 对象）感兴趣。（state 也可以作为可选项放入）
// 我们可以利用 ES6 的解构（destructuring）功能来简化对参数的导入


// ES6引入rest参数（形式为“…变量名”），用于获取函数的多余参数，
// 这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

// 不定参数是在函数中使用命名参数同时接收不定数量的未命名参数。
// 这只是一种语法糖，在以前的JavaScript代码中我们可以通过arguments变量来达到这一目的。
// 不定参数的格式是三个句点后跟代表所有不定参数的变量名。

function makeAction(type){
	return ( {dispatch},...args ) => dispatch(type,...args)
}
const initNote={
	id:+new Date(),
	title:'zrliao的笔记',
	content:'zrliao的第一篇笔记内容',
	favorite:false
}
// 模拟初始化数据
const initData={
	show:'all',
	notes:[initNote],
	activeNote:initNote
}

export const initStore = ({dispatch}) =>{
	dispatch('INIT_STORE',initData)
}

// 更新 当前activeNote对象
export const updateActiveNote = makeAction('SET_ACTIVE_NOTE')

// 添加一个note对象
export const newNote=makeAction('NEW_NOTE')

// 删除一个note对象
export const deleteNote=makeAction('DELETE_NOTE')

export const toggleFavorite=makeAction('TOGGLE_FAVORITE')

export const editNote=makeAction('EDIT_NOTE')

// 更新列表展示

// 点击 All Notes列表 跟 Favorites列表  
// 这步动作的主要 作用就是  改变 state.show的值

export const updateShow=makeAction('SET_SHOW_ALL')


// 然后我们从 components/IncrementButton.vue 组件里调用 action 函数

// 在我们的 vuex/actions.js 文件里我们
//  dispatch 了一个叫做 INCREMENT 的 mutation，
//  但是我们还没有写它所对应的具体操作。我们现在就来做这个事。
// 修改 vuex/store.js


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