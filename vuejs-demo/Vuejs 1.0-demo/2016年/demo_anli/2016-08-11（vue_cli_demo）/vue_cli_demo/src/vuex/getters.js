
// 第四步：在组件获取值

// 创建一个新的文件 vuex/getters.js：

// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count

export function getCount (state) {
  return state.count
}

// 这个函数返回了 state 对象里我们所需要的部分—— count 的值。
// 我们现在在组件里加入这个 getter 函数。

// <!-- State（状态），Mutations（变更） 和 Actions（动作）。 -->

