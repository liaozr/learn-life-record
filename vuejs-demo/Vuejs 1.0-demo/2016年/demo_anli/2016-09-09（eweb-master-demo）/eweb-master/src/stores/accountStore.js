import * as PORTAL from './mutation-types'

// initial state

const state = {
    accountStr:""
}

// mutations
const mutations = {
  [PORTAL.USERINFO] (state, data) {
      state.accountStr = JSON.parse(data);
  }
}

export default {
  state,
  mutations
}
