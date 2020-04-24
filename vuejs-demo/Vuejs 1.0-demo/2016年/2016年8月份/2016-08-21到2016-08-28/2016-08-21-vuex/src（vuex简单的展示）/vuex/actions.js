
// action 是一种专门用来被 component 调用的函数。

// actions 是用于dispatch mutations的函数
// 一个action 可以dispatch多个  mutations

// action 函数能够通过分发相应的 mutation 函数，
// 来触发对 store 的更新。action 也可以先从 HTTP 
// 后端或 store 中读取其他数据之后再分发更新事件。


// 创建一个新文件 vuex/actions.js，然后写入一个函数 incrementCounter：

// action 会收到 store 作为它的第一个参数

// 既然我们只对事件的分发（dispatch 对象）感兴趣。（state 也可以作为可选项放入）
// 我们可以利用 ES6 的解构（destructuring）功能来简化对参数的导入

export const incrementCounter = function ({ dispatch, state }) {
  dispatch('INCREMENT', 1)
}

export const releaseCounter = function ({ dispatch, state }) {
  dispatch('RECREMENT', 1)
}

// 然后我们从 components/IncrementButton.vue 组件里调用 action 函数


// 在我们的 vuex/actions.js 文件里我们
//  dispatch 了一个叫做 INCREMENT 的 mutation，
//  但是我们还没有写它所对应的具体操作。我们现在就来做这个事。
// 修改 vuex/store.js


// <!-- State（状态），Mutations（变更） 和 Actions（动作）。 -->