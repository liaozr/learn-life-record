const state = {
  userName: '',
  intoHuameiType: ''
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_HUAMEI_TYPE(state, type) {
    state.intoHuameiType = type
  }
}
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  },
  sethuemeiType({ commit }, type) {
    commit('SET_HUAMEI_TYPE', type)
  }
}
export default {
  state,
  mutations,
  actions
}
