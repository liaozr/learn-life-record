
// 可以写成下面这种形式的
// import { GETSTARTLIST} from '../mutation-types'
// import { GETTERSLISTS} from '../mutation-types'
// -------------------------------------------------

import * as types from '../mutation-types'

// 该模块的初始状态
const state = {
     transitionName:"slide-right"
}

// 相关的 mutations
// 要记得 mutations 里面 不同 mutation之间  是要 加逗号的

const mutations = {

    [types.SLIDELEFT] (state) {
        state.transitionName="slide-left"
    },
    [types.SLIDERIGHT] (state) {
        state.transitionName="slide-right"
    },
    [types.FADE] (state) {
        state.transitionName="fade"
    }
}

export default {
    state,
    mutations
}
