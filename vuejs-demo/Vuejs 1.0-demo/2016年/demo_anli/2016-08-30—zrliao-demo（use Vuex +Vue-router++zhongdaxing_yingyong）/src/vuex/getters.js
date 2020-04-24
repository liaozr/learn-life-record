
// getters.js

export const orders = (state) => {
    return state.orderList.orders
}

export const activeOrder = (state) => {
    return state.orderList.activeOrder
}

export const currentmoney = (state) => {
    return state.orderList.currentmoney
}


// getters 子对象。
// 它是我们指定当前组件能从 store 里获取哪些状态信息的地方。
// 它的每个属性名将对应一个 getter 函数。
// 该函数仅接收 store 的整个状态树作为其唯一参数，
// 之后既可以返回状态树的一部分，
// 也可以返回从状态树中求取的计算值。
// 而返回结果，则会依据这个 getter 的属性名添加到组件上，
// 用法与组件自身的计算属性一毛一样。